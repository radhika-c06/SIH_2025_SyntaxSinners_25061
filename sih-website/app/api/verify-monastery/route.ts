/**
 * POST /api/verify-monastery
 * Verify monastery information using AI chatbot
 */

import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, location, altitude, founded, description } = data;

    // Construct verification claim
    const claim = `${name} is a monastery located in ${location}${altitude ? ` at ${altitude} altitude` : ''}${founded ? `, founded in ${founded}` : ''}. ${description || ''}`;

    // Paths for Python and script
    const parentDir = path.join(process.cwd(), '..');
    const pythonScript = path.join(parentDir, 'verify_monastery.py');
    const pythonPath = path.join(parentDir, '.venv', 'Scripts', 'python.exe');
    
    const verificationResult = await new Promise<{verdict: string, reason: string}>((resolve, reject) => {
      const python = spawn(pythonPath, [pythonScript, claim], {
        env: { ...process.env, GROQ_API_KEY: process.env.GROQ_API_KEY }
      });
      let output = '';
      let errorOutput = '';

      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${errorOutput}`));
          return;
        }

        try {
          const result = JSON.parse(output);
          
          // Parse verdict from the response
          const verdictMatch = result.verdict.match(/VERDICT:\s*(TRUE|FALSE|PARTIALLY TRUE|UNVERIFIABLE)/i);
          const reasonMatch = result.verdict.match(/REASON:\s*(.+)/i);
          
          const verdict = verdictMatch ? verdictMatch[1].toUpperCase() : 'UNVERIFIABLE';
          const reason = reasonMatch ? reasonMatch[1].trim() : result.verdict;
          
          resolve({ verdict, reason });
        } catch (parseError) {
          reject(new Error(`Failed to parse verification result: ${output}`));
        }
      });
    });

    // Determine if approved
    const isApproved = verificationResult.verdict === 'TRUE' || verificationResult.verdict === 'PARTIALLY TRUE';

    return NextResponse.json({
      success: true,
      data: {
        approved: isApproved,
        verdict: verificationResult.verdict,
        reason: verificationResult.reason,
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
