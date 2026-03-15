/**
 * POST /api/auth/2fa/verify
 * Verifies a TOTP code for either setup or login flows.
 * Accepts JSON: { code: string, action: 'setup' | 'login' }
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';
import { verifyToken, JWTPayload } from '@/lib/auth/jwt';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, action } = body;

    if (!code || !action) {
      return NextResponse.json({ success: false, error: 'Code and action are required' }, { status: 400 });
    }

    if (action === 'setup') {
      // Must be an authenticated admin (full JWT)
      const admin = await getAuthenticatedAdmin(request);
      await connectDB();
      const dbAdmin = await AdminUser.findById(admin._id).select('+totpSecret');
      if (!dbAdmin || !dbAdmin.totpSecret) {
        return NextResponse.json({ success: false, error: 'TOTP not initialized' }, { status: 400 });
      }

      const isValid = authenticator.check(code, dbAdmin.totpSecret);
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Invalid code' }, { status: 401 });
      }

      // Enable 2FA
      dbAdmin.is2FAEnabled = true;
      await dbAdmin.save();

      return NextResponse.json({ success: true });
    }

    if (action === 'login') {
      // For login verification, expect a temporary cookie 'admin_2fa_temp'
      const tempToken = request.cookies.get('admin_2fa_temp')?.value;
      if (!tempToken) {
        return NextResponse.json({ success: false, error: 'No temporary authentication token' }, { status: 401 });
      }

      const decoded = verifyToken(tempToken) as JWTPayload | null;
      if (!decoded) {
        return NextResponse.json({ success: false, error: 'Invalid or expired temporary token' }, { status: 401 });
      }

      await connectDB();
      const admin = await AdminUser.findById(decoded.adminId).select('+totpSecret');
      if (!admin || !admin.totpSecret) {
        return NextResponse.json({ success: false, error: 'Admin TOTP not configured' }, { status: 400 });
      }

      const isValid = authenticator.check(code, admin.totpSecret);
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Invalid code' }, { status: 401 });
      }

      // Issue main JWT
      const token = signToken({ adminId: admin._id.toString(), role: admin.role as 'superadmin' | 'editor' });

      const response = NextResponse.json({ success: true });
      response.cookies.set({ name: 'admin_token', value: token, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 7 * 24 * 60 * 60 });
      // Clear temp cookie
      response.cookies.set({ name: 'admin_2fa_temp', value: '', path: '/', maxAge: 0 });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('2FA verify error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
