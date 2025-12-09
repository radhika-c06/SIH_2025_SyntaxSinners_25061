/**
 * Authenticated Admin Helper
 * Extracts and verifies admin from JWT token in cookies
 */

import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminUser, IAdminUser } from '@/lib/models/AdminUser';
import { verifyToken } from '@/lib/auth/jwt';

/**
 * Extract and verify admin from request
 * Throws error if not authenticated
 */
export async function getAuthenticatedAdmin(
  request: NextRequest
): Promise<IAdminUser> {
  try {
    // Get token from cookies
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      throw new Error('No authentication token provided');
    }

    // Verify JWT
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid or expired token');
    }

    // Connect to DB and fetch admin
    await connectDB();
    const admin = await AdminUser.findById(decoded.adminId);

    if (!admin) {
      throw new Error('Admin not found');
    }

    return admin;
  } catch (error) {
    throw new Error(
      `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Check if user is superadmin (used in some endpoints)
 */
export async function requireSuperAdmin(
  request: NextRequest
): Promise<IAdminUser> {
  const admin = await getAuthenticatedAdmin(request);

  if (admin.role !== 'superadmin') {
    throw new Error('This action requires superadmin privileges');
  }

  return admin;
}
