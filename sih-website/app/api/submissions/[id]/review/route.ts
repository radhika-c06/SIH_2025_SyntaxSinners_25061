/**
 * PATCH /api/submissions/[id]/review
 * Review and approve/reject a submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContributorSubmission } from '@/lib/models/ContributorSubmission';
import { Monastery } from '@/lib/models/Monastery';
import { getAuthenticatedAdmin, requireSuperAdmin } from '@/lib/auth/getAuthenticatedAdmin';
import { Types } from 'mongoose';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

    const body = await request.json();
    const { status, reviewNotes, createMonastery } = body;

    // Validation
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Status must be either "approved" or "rejected"',
        },
        { status: 400 }
      );
    }

    // Validate MongoDB ID
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Find submission
    const submission = await ContributorSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission not found',
        },
        { status: 404 }
      );
    }

    // Update submission
    submission.status = status;
    if (reviewNotes) {
      submission.reviewNotes = reviewNotes;
    }

    // If approved and createMonastery is true, create monastery
    if (status === 'approved' && createMonastery && submission.rawContent) {
      // Auto-generate slug from monastery name
      const baseSlug = submission.monasteryName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      let slug = baseSlug;
      let counter = 1;

      // Check for slug uniqueness
      while (await Monastery.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // Create monastery from submission
      const monastery = new Monastery({
        slug,
        name: submission.monasteryName,
        location: submission.location,
        shortDescription: submission.rawContent.description || '',
        heroImageUrl: submission.rawContent.heroImage || '',
        gallery: submission.rawContent.gallery || [],
        sections: submission.rawContent.sections || [],
        isPublished: true,
      });

      await monastery.save();
      submission.linkedMonasteryId = monastery._id;
    }

    await submission.save();

    return NextResponse.json(
      {
        success: true,
        data: submission,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Review submission error:', error);

    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
