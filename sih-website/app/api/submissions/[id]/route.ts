/**
 * GET /api/submissions/[id]
 * Get a single submission detail
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContributorSubmission } from '@/lib/models/ContributorSubmission';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';
import { Types } from 'mongoose';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { id } = await context.params;
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

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

    // Fetch submission
    const submission = await ContributorSubmission.findById(id).populate(
      'linkedMonasteryId',
      'name slug'
    );

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          error: 'Submission not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: submission,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get submission error:', error);

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
