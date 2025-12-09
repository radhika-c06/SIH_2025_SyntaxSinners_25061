'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'editor';
}

interface AuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  verify2FA: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.needs2FA) {
        // 2FA is required - this will be handled by the login page
        throw new Error('2FA_REQUIRED');
      }

      setAdmin(data.data);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    }
  };

  const verify2FA = async (code: string) => {
    setError(null);
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, action: 'login' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '2FA verification failed');
      }

      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : '2FA verification failed';
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setAdmin(null);
      setIsAuthenticated(false);
      setError(null);
      router.push('/admin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated,
        login,
        verify2FA,
        logout,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
