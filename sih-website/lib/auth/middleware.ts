/**
 * Authentication Middleware
 * Protects admin routes and APIs
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

/**
 * Verify admin token from cookies
 * Used in API routes to protect endpoints
 */
export function verifyAdminAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return {
        authenticated: false,
        error: 'No authentication token provided',
      };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return {
        authenticated: false,
        error: 'Invalid or expired token',
      };
    }

    return {
      authenticated: true,
      adminId: decoded.adminId,
      role: decoded.role,
      error: null,
    };
  } catch (error) {
    return {
      authenticated: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}

/**
 * Create forbidden response
 */
export function forbiddenResponse(message = 'Forbidden') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 403 }
  );
}
