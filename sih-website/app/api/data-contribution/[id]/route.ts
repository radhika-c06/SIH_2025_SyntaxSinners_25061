import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContributorSubmission } from '@/lib/models/ContributorSubmission';
import mongoose from 'mongoose';

// GET: Retrieve a specific data contribution
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    console.log('API: Fetching submission with ID:', params.id);

    // Try to find by _id (MongoDB ObjectId)
    let submission = null;
    
    // If it looks like an ObjectId, try to find it
    if (mongoose.Types.ObjectId.isValid(params.id)) {
      submission = await ContributorSubmission.findById(params.id).lean();
      console.log('Found by ObjectId:', !!submission);
    }

    if (!submission) {
      console.log('Submission not found for ID:', params.id);
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    console.log('Submission found, formatting response');

    // Format response
    const formatted = {
      id: submission._id.toString(),
      monasteryName: submission.monasteryName,
      contributorName: submission.contributorName,
      contributorEmail: submission.contributorEmail,
      status: submission.status || 'pending',
      timestamp: submission.createdAt,
      ...submission.rawContent,
      _id: submission._id.toString(),
    };

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching submission:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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
    await connectDB();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid submission ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, reviewNotes } = body;

    // Validate status
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update submission
    const submission = await ContributorSubmission.findByIdAndUpdate(
      params.id,
      {
        status,
        reviewNotes: reviewNotes || '',
      },
      { new: true }
    ).lean();

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Format response
    const formatted = {
      id: submission._id,
      monasteryName: submission.monasteryName,
      contributorName: submission.contributorName,
      contributorEmail: submission.contributorEmail,
      status: submission.status,
      timestamp: submission.createdAt,
      ...submission.rawContent,
      _id: submission._id,
    };

    return NextResponse.json({
      message: 'Submission updated successfully',
      submission: formatted,
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}
