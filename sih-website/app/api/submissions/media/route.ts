import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { MediaSubmission } from '@/lib/models/MediaSubmission';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    await connectDB();

    const filter: Record<string, any> = {};
    if (status && status !== 'All') {
      filter.status = status;
    }

    const submissions = await MediaSubmission.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving media submissions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
}
