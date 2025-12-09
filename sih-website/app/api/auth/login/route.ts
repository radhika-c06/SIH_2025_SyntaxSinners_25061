/**
 * POST /api/auth/login
 * Authenticate admin user and set JWT cookie
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';
import { comparePassword } from '@/lib/auth/password';
import { signToken } from '@/lib/auth/jwt';
import { signShortLivedToken } from '@/lib/auth/jwt';

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

    // Connect to DB
    await connectDB();

    // Find admin by email and explicitly select passwordHash
    const admin = await AdminUser.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Create JWT token
    // If admin has 2FA enabled, issue a short-lived temp token and ask for TOTP
    if (admin.is2FAEnabled) {
      const temp = signShortLivedToken({ adminId: admin._id.toString(), role: admin.role }, '5m');

      const response = NextResponse.json(
        {
          success: true,
          needs2FA: true,
          data: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
        { status: 200 }
      );

      // Set temporary cookie for 2FA validation
      response.cookies.set({
        name: 'admin_2fa_temp',
        value: temp,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 5 * 60, // 5 minutes
      });

      return response;
    }

    const token = signToken(admin);

    // Create response
    const response = NextResponse.json(
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
