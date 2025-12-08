import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Simple authentication credentials (In production, use a proper auth system)
const ADMIN_CREDENTIALS = {
  email: 'admin@sikkim.gov.in',
  password: 'admin123', // In production, hash passwords with bcrypt
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Create a simple session token (In production, use JWT or secure sessions)
      const sessionToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Login successful' });
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
