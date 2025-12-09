/**
 * POST /api/auth/register
 * Register a new admin user
 */

import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth/fileAuth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, inviteCode } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, email, and password are required',
        },
        { status: 400 }
      );
    }

    // Check invite code if required
    if (process.env.ADMIN_INVITE_CODE) {
      if (inviteCode !== process.env.ADMIN_INVITE_CODE) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid invite code',
          },
          { status: 403 }
        );
      }
    }

    // Register user
    const result = await registerUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: result.data?.id,
          name: result.data?.name,
          email: result.data?.email,
          role: result.data?.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
