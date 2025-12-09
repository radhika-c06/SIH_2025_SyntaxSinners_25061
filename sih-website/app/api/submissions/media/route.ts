import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const submissionsDir = join(process.cwd(), 'data', 'submissions');

    if (!existsSync(submissionsDir)) {
      return NextResponse.json([], { status: 200 });
    }

    const fs = require('fs').promises;
    const files = await fs.readdir(submissionsDir);

    let submissions = [];

    // Get all submissions
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filepath = join(submissionsDir, file);
        const content = await fs.readFile(filepath, 'utf-8');
        submissions.push(JSON.parse(content));
      }
    }

    // Filter by status if provided
    if (status && status !== 'All') {
      submissions = submissions.filter((sub) => sub.status === status);
    }

    // Sort by creation date (newest first)
    submissions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving media submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}
