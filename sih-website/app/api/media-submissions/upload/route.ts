import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

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

    // Create submissions data directory if it doesn't exist
    const submissionsDir = join(process.cwd(), 'data', 'submissions');
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Create filename from title and timestamp
    const timestamp = new Date().getTime();
    const filename = `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${timestamp}.json`;
    const filepath = join(submissionsDir, filename);

    // Prepare submission record
    const submission = {
      id: timestamp.toString(),
      title: data.title,
      monasteryName: data.monasteryName,
      contributorName: data.contributorName || 'Anonymous',
      contributorEmail: data.contributorEmail || '',
      type: data.type || 'media', // 'photo', 'video', or combined
      description: data.description || '',
      location: data.location || '',
      tags: data.tags || [],
      mediaFiles: data.mediaFiles || [],
      ocrData: data.ocrData || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      submittedOn: new Date().toISOString().split('T')[0],
    };

    // Save to JSON file
    await writeFile(filepath, JSON.stringify(submission, null, 2), 'utf-8');

    return NextResponse.json(
      {
        success: true,
        message: 'Media submission saved successfully',
        id: submission.id,
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
    const submissionsDir = join(process.cwd(), 'data', 'submissions');

    if (!existsSync(submissionsDir)) {
      return NextResponse.json([], { status: 200 });
    }

    const fs = require('fs').promises;
    const files = await fs.readdir(submissionsDir);

    const submissions = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filepath = join(submissionsDir, file);
        const content = await fs.readFile(filepath, 'utf-8');
        submissions.push(JSON.parse(content));
      }
    }

    // Sort by creation date (newest first)
    submissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}
