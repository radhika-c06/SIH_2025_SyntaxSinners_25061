/**
 * POST /api/auth/2fa/setup
 * Generates a TOTP secret for the authenticated admin and returns a QR code data URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';
import { connectDB } from '@/lib/db';
import { AdminUser } from '@/lib/models/AdminUser';

export async function POST(request: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(request);

    // Generate secret
    const secret = authenticator.generateSecret();

    // Build otpauth URI (for mobile apps)
    const issuer = process.env.NEXT_PUBLIC_APP_NAME || 'SIH-Dashboard';
    const label = `${issuer}:${admin.email}`;
    const otpauth = authenticator.keyuri(admin.email, issuer, secret);

    // Generate QR code data URL
    const qrDataUrl = await qrcode.toDataURL(otpauth);

    // Save secret to admin but do not enable yet until verified
    await connectDB();
    await AdminUser.findByIdAndUpdate(admin._id, { totpSecret: secret }, { new: true });

    return NextResponse.json({ success: true, qr: qrDataUrl });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate 2FA setup' }, { status: 500 });
  }
}
