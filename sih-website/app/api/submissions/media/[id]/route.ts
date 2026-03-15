import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { MediaSubmission } from '@/lib/models/MediaSubmission';
import mongoose from 'mongoose';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectDB();

    const submission = mongoose.Types.ObjectId.isValid(id)
      ? await MediaSubmission.findById(id).lean()
      : null;

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json(submission, { status: 200 });
  } catch (error) {
    console.error('Error retrieving submission:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve submission' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const updateData = await request.json();

    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
    }

    const updated = await MediaSubmission.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

