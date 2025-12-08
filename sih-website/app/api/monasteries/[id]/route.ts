/**
 * GET /api/monasteries/[id]
 * Get a single monastery (by ID or slug)
 * 
 * PATCH /api/monasteries/[id]
 * Update monastery (admin only)
 * 
 * DELETE /api/monasteries/[id]
 * Delete monastery (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Monastery } from '@/lib/models/Monastery';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';
import { Types } from 'mongoose';

interface RouteParams {
  params: {
    id: string;
  };
}

async function findMonastery(idOrSlug: string) {
  // Try to find by MongoDB ID first
  if (Types.ObjectId.isValid(idOrSlug)) {
    const monastery = await Monastery.findById(idOrSlug);
    if (monastery) return monastery;
  }

  // Then try to find by slug
  return await Monastery.findOne({ slug: idOrSlug });
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const monastery = await findMonastery(params.id);

    if (!monastery) {
      return NextResponse.json(
        {
          success: false,
          error: 'Monastery not found',
        },
        { status: 404 }
      );
    }

    // Check if published for public users
    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (!monastery.isPublished && !adminMode) {
      return NextResponse.json(
        {
          success: false,
          error: 'Monastery not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: monastery,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get monastery error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

    const body = await request.json();
    const updateFields = body;

    // Prevent slug changes via PATCH
    if (updateFields.slug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot modify slug via PATCH',
        },
        { status: 400 }
      );
    }

    await connectDB();

    const monastery = await findMonastery(params.id);

    if (!monastery) {
      return NextResponse.json(
        {
          success: false,
          error: 'Monastery not found',
        },
        { status: 404 }
      );
    }

    // Update allowed fields
    const allowedFields = [
      'name',
      'location',
      'district',
      'altitude',
      'founded',
      'shortDescription',
      'heroImageUrl',
      'gallery',
      'sections',
      'isPublished',
    ];

    Object.keys(updateFields).forEach((key) => {
      if (allowedFields.includes(key)) {
        (monastery as any)[key] = updateFields[key];
      }
    });

    await monastery.save();

    return NextResponse.json(
      {
        success: true,
        data: monastery,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update monastery error:', error);

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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

    await connectDB();

    const monastery = await findMonastery(params.id);

    if (!monastery) {
      return NextResponse.json(
        {
          success: false,
          error: 'Monastery not found',
        },
        { status: 404 }
      );
    }

    await Monastery.findByIdAndDelete(monastery._id);

    return NextResponse.json(
      {
        success: true,
        data: { message: 'Monastery deleted successfully' },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete monastery error:', error);

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
