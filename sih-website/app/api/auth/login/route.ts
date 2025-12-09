/**
 * POST /api/auth/login
 * Authenticate admin user and set JWT cookie
 */

import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth/fileAuth';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    // Login user
    const result = await loginUser(email, password);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 401 }
      );
    }

    // Create JWT token - pass user data to signToken
    const token = signToken({
      adminId: result.data?.id || '',
      role: (result.data?.role as 'superadmin' | 'editor') || 'editor',
    });

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: {
          id: result.data?.id,
          name: result.data?.name,
          email: result.data?.email,
          role: result.data?.role,
        },
      },
      { status: 200 }
    );

    // Set HttpOnly cookie (7 days)
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}