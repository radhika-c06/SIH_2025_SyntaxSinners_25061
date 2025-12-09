import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions', 'data-contributions.json');

async function readSubmissions() {
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeSubmissions(submissions: any[]) {
  await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

// GET: Retrieve a specific data contribution
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submissions = await readSubmissions();
    const submission = submissions.find((s: any) => s.id === params.id);

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}

// PUT: Update a specific data contribution status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const submissions = await readSubmissions();
    const submissionIndex = submissions.findIndex((s: any) => s.id === params.id);

    if (submissionIndex === -1) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Update submission
    submissions[submissionIndex] = {
      ...submissions[submissionIndex],
      status: body.status,
      reviewNotes: body.reviewNotes || '',
      reviewedAt: body.reviewedAt,
      reviewedBy: body.reviewedBy || 'admin',
    };

    await writeSubmissions(submissions);

    return NextResponse.json({
      message: 'Submission updated successfully',
      submission: submissions[submissionIndex],
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
