import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { MediaSubmission } from '@/lib/models/MediaSubmission';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.monasteryName) {
      return NextResponse.json(
        { error: 'Missing required fields: title and monasteryName' },
        { status: 400 }
      );
    }

    await connectDB();

    const doc = await MediaSubmission.create({
      title: data.title,
      monasteryName: data.monasteryName,
      contributorName: data.contributorName || 'Anonymous',
      contributorEmail: data.contributorEmail || '',
      type: data.type || 'media',
      description: data.description || '',
      location: data.location || '',
      tags: data.tags || [],
      mediaFiles: data.mediaFiles || [],
      ocrData: data.ocrData || null,
      status: 'pending',
      submittedOn: new Date().toISOString().split('T')[0],
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Media submission saved successfully',
        id: doc._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving media submission:', error);
    return NextResponse.json(
      { error: 'Failed to save media submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const submissions = await MediaSubmission.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}

