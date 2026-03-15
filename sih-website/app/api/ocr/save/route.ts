import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { OcrRecord } from '@/lib/models/OcrRecord';
import { MediaSubmission } from '@/lib/models/MediaSubmission';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.location || !data.monasteryName || !data.cleanedText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Save OCR record to MongoDB
    const ocrDoc = await OcrRecord.create({
      title: data.title,
      language: data.language,
      capturedOn: data.capturedOn,
      location: data.location,
      monasteryName: data.monasteryName,
      description: data.description || '',
      tags: data.tags || [],
      rawText: data.rawText,
      cleanedText: data.cleanedText,
      imageData: data.imageData,
      contributorName: data.contributorName || 'Anonymous',
      contributorEmail: data.contributorEmail || '',
      status: 'pending',
    });

    // Also save to MediaSubmission so it appears in admin submissions page
    await MediaSubmission.create({
      title: data.title,
      monasteryName: data.monasteryName,
      contributorName: data.contributorName || 'Anonymous',
      contributorEmail: data.contributorEmail || '',
      type: 'ocr',
      description: data.description || '',
      location: data.location || '',
      tags: data.tags || [],
      mediaFiles: data.imageData ? [{ type: 'image', data: data.imageData }] : [],
      ocrData: {
        language: data.language,
        capturedOn: data.capturedOn,
        rawText: data.rawText,
        cleanedText: data.cleanedText,
      },
      status: 'pending',
      submittedOn: new Date().toISOString().split('T')[0],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'OCR data saved successfully',
        id: ocrDoc._id.toString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving OCR data:', error);
    return NextResponse.json(
      { error: 'Failed to save OCR data' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve OCR records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await connectDB();

    if (id) {
      const record = await OcrRecord.findById(id).lean();
      if (!record) {
        return NextResponse.json({ error: 'Record not found' }, { status: 404 });
      }
      return NextResponse.json(record);
    } else {
      const records = await OcrRecord.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ records });
    }
  } catch (error) {
    console.error('Error retrieving OCR data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve OCR data' },
      { status: 500 }
    );
  }
}
