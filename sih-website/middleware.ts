import { NextRequest, NextResponse } from 'next/server';

// Paths to protect for admin access
const PROTECTED_PREFIXES = ['/admin/dashboard', '/admin/contributors', '/admin/media', '/admin/monasteries', '/admin/settings', '/admin/submissions'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and public assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.startsWith('/public') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // If path is not under protected prefixes, continue
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
  if (!isProtected) return NextResponse.next();

  // Simple presence check for admin_token cookie (Edge-safe)
  // Full JWT verification happens in API routes and server components
  const token = request.cookies.get('admin_token')?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  // Token exists -> allow (actual validation in getAuthenticatedAdmin on server)
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
