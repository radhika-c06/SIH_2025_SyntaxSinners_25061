/**
 * JWT Utility
 * Token creation and verification for admin authentication
 */

import jwt from 'jsonwebtoken';
import { IAdminUser } from '@/lib/models/AdminUser';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';

export interface JWTPayload {
  adminId: string;
  role: 'superadmin' | 'editor';
  iat?: number;
  exp?: number;
}

/**
 * Sign a JWT token for an admin user
 */
export function signToken(admin: IAdminUser): string {
  const payload: JWTPayload = {
    adminId: admin._id.toString(),
    role: admin.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
