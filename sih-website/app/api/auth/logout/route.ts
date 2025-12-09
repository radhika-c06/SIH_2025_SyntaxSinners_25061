/**
 * POST /api/auth/logout
 * Clear admin session by removing JWT cookie
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        data: { message: 'Logged out successfully' },
      },
      { status: 200 }
    );

    // Clear the admin_token cookie
    response.cookies.set({
      name: 'admin_token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
      expires: new Date(0), // Set to past date to delete
    });

    // Also clear 2FA temp cookie if exists
    response.cookies.set({
      name: 'admin_2fa_temp',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
