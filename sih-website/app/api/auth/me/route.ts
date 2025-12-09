/**
 * GET /api/auth/me
 * Get current authenticated admin info
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';

export async function GET(request: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(request);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Not authenticated',
      },
      { status: 401 }
    );
  }
}
