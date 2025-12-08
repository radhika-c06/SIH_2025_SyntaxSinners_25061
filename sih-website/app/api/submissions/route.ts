/**
 * GET /api/submissions
 * List all submissions (admin only) with optional status filtering
 * 
 * POST /api/submissions
 * Create a new contributor submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContributorSubmission } from '@/lib/models/ContributorSubmission';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build filter query
    const filter: Record<string, any> = {};
    if (status) {
      filter.status = status;
    }

    // Fetch submissions with pagination
    const skip = (page - 1) * limit;
    const submissions = await ContributorSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('linkedMonasteryId', 'name slug');

    const total = await ContributorSubmission.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: {
          submissions,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get submissions error:', error);

    // Handle auth errors
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      monasteryName,
      location,
      contributorName,
      contributorEmail,
      rawContent,
    } = body;

    // Validation
    if (!monasteryName || !location || !contributorName || !contributorEmail) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: monasteryName, location, contributorName, contributorEmail',
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contributorEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Create submission
    const submission = new ContributorSubmission({
      monasteryName,
      location,
      contributorName,
      contributorEmail,
      rawContent: rawContent || {},
      status: 'pending',
    });

    await submission.save();

    return NextResponse.json(
      {
        success: true,
        data: submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
