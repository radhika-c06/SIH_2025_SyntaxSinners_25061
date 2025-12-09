'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'superadmin' | 'editor';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { admin, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Not authenticated - redirect to login
      router.push('/admin');
    } else if (!loading && requiredRole && admin?.role !== requiredRole && admin?.role !== 'superadmin') {
      // Not authorized - redirect to dashboard
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, loading, admin, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#410704' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return <>{children}</>;
}
