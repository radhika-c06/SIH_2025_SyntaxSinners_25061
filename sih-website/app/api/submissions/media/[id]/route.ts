import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const submissionsDir = join(process.cwd(), 'data', 'submissions');

    if (!existsSync(submissionsDir)) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const fs = require('fs').promises;
    const files = await fs.readdir(submissionsDir);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filepath = join(submissionsDir, file);
        const content = await fs.readFile(filepath, 'utf-8');
        const submission = JSON.parse(content);

        if (submission.id === id) {
          return NextResponse.json(submission, { status: 200 });
        }
      }
    }

    return NextResponse.json(
      { error: 'Submission not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error retrieving submission:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submission' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const updateData = await request.json();

    const submissionsDir = join(process.cwd(), 'data', 'submissions');

    if (!existsSync(submissionsDir)) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const fs = require('fs').promises;
    const files = await fs.readdir(submissionsDir);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filepath = join(submissionsDir, file);
        const content = await fs.readFile(filepath, 'utf-8');
        const submission = JSON.parse(content);

        if (submission.id === id) {
          const updated = {
            ...submission,
            ...updateData,
            updatedAt: new Date().toISOString(),
          };

          await fs.writeFile(filepath, JSON.stringify(updated, null, 2), 'utf-8');
          return NextResponse.json(updated, { status: 200 });
        }
      }
    }

    return NextResponse.json(
      { error: 'Submission not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
