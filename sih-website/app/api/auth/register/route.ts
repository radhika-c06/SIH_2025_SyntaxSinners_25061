/**
 * POST /api/auth/register
 * Register a new admin user
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';
import { hashPassword } from '@/lib/auth/password';

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

    // Connect to DB
    await connectDB();

    // Check if email already exists
    const existingAdmin = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email already registered',
        },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin
    const admin = new AdminUser({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    await admin.save();

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
