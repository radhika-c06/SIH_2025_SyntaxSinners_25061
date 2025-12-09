/**
 * GET /api/monasteries
 * List all published monasteries (public endpoint)
 * 
 * POST /api/monasteries
 * Create a new monastery (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Monastery } from '@/lib/models/Monastery';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const adminMode = searchParams.get('admin') === 'true';

    // Build filter - show all if admin, only published if public
    const filter: Record<string, any> = {};
    if (!adminMode) {
      filter.isPublished = true;
    }

    // Fetch monasteries with pagination
    const skip = (page - 1) * limit;
    const monasteries = await Monastery.find(filter)
      .select('-sections') // Exclude detailed sections in list view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Monastery.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: {
          monasteries,
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
  } catch (error) {
    console.error('Get monasteries error:', error);
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
    // Authenticate admin
    const admin = await getAuthenticatedAdmin(request);

    const body = await request.json();
    const {
      name,
      location,
      district,
      altitude,
      founded,
      shortDescription,
      heroImageUrl,
      gallery,
      sections,
      isPublished,
    } = body;

    // Validation
    if (!name || !location) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and location are required',
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Auto-generate slug from monastery name
    const baseSlug = name
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

    // Create monastery
    const monastery = new Monastery({
      slug,
      name,
      location,
      district: district || '',
      altitude: altitude || 0,
      founded: founded || '',
      shortDescription: shortDescription || '',
      heroImageUrl: heroImageUrl || '',
      gallery: gallery || [],
      sections: sections || [],
      isPublished: isPublished ?? false, // Use isPublished from request body, default to false
    });

    await monastery.save();

    return NextResponse.json(
      {
        success: true,
        data: monastery,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create monastery error:', error);

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
