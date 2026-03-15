/**
 * POST /api/verify-monastery
 * Verify monastery information using Groq AI (direct API call, no subprocess)
 */

import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, location, altitude, founded, description } = data;

    if (!name || !location) {
      return NextResponse.json(
        { success: false, error: 'name and location are required' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { success: false, error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Construct verification claim (mirrors verify_monastery.py logic)
    const claim = `${name} is a monastery located in ${location}${altitude ? ` at ${altitude} altitude` : ''}${founded ? `, founded in ${founded}` : ''}. ${description || ''}`;

    const systemPrompt = `You are a fact-checker specializing in Buddhist monasteries and religious sites in the Himalayan region (Sikkim, Darjeeling, Nepal, Bhutan, Tibet). Your task is to verify claims about monasteries.

Respond ONLY in this exact format:
VERDICT: [TRUE / FALSE / PARTIALLY TRUE / UNVERIFIABLE]
REASON: [One sentence explanation]`;

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Verify this claim: ${claim}` },
        ],
        max_tokens: 150,
        temperature: 0.1,
      }),
    });

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      throw new Error(`Groq API error ${groqResponse.status}: ${errText}`);
    }

    const groqData = await groqResponse.json();
    const rawText: string = groqData.choices?.[0]?.message?.content ?? '';

    const verdictMatch = rawText.match(/VERDICT:\s*(TRUE|FALSE|PARTIALLY TRUE|UNVERIFIABLE)/i);
    const reasonMatch = rawText.match(/REASON:\s*(.+)/i);

    const verdict = verdictMatch ? verdictMatch[1].toUpperCase() : 'UNVERIFIABLE';
    const reason = reasonMatch ? reasonMatch[1].trim() : rawText;
    const isApproved = verdict === 'TRUE' || verdict === 'PARTIALLY TRUE';

    return NextResponse.json({
      success: true,
      data: {
        approved: isApproved,
        verdict,
        reason,
        claim,
      },
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 }
    );
  }
}
