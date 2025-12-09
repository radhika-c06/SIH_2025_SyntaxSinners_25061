'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'admin' | 'guest'>('admin');
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needs2FA, setNeeds2FA] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only check authentication, don't auto-redirect
    // This allows users to see the login page

    // Clear form fields on mount
    setEmail('');
    setPassword('');
    setTotpCode('');
    setError('');
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'admin') {
      // Admin login logic - validation
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Login failed');
          setLoading(false);
          return;
        }

        if (data.needs2FA) {
          // Admin has 2FA enabled, show TOTP input
          setNeeds2FA(true);
          setLoading(false);
          return;
        }

        // Login successful - redirect to dashboard
        router.push('/admin/dashboard');
      } catch (err) {
        setError('Network error. Please try again.');
        setLoading(false);
      }
    } else {
      // Guest mode - direct navigation
      router.push('/');
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!totpCode || totpCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: totpCode, action: 'login' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '2FA verification failed');
        setLoading(false);
        return;
      }

      // 2FA successful - redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleGuestExplore = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#410704' }}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/design.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '400px auto',
          }}
        />
        {/* Animated particles - only render after mount to avoid hydration mismatch */}
        {isMounted && (
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-amber-400 rounded-full animate-pulse"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: Math.random() * 3 + 2 + 's',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div
            className="rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(217, 119, 6, 0.15)',
              border: '2px solid rgba(217, 119, 6, 0.3)',
            }}
          >
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1
                className="text-5xl font-bold text-amber-100 mb-2"
                style={{ fontFamily: 'Poppins' }}
              >
                Login
              </h1>
            </div>

            {/* Mode Toggle */}
            <div className="mb-8">
              <div
                className="rounded-full p-1.5"
                style={{
                  backgroundColor: 'rgba(217, 119, 6, 0.2)',
                  border: '2px solid rgba(217, 119, 6, 0.3)',
                }}
              >
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => setMode('admin')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      mode === 'admin'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 shadow-lg'
                        : 'text-amber-100 hover:text-amber-50'
                    }`}
                    style={{ fontFamily: 'Poppins' }}
                  >
                    Login as Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('guest')}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      mode === 'guest'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 shadow-lg'
                        : 'text-amber-100 hover:text-amber-50'
                    }`}
                    style={{ fontFamily: 'Poppins' }}
                  >
                    Explore as Guest
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={needs2FA ? handleVerify2FA : handleLogin}
              className="space-y-6"
            >
              {mode === 'admin' ? (
                <>
                  {!needs2FA ? (
                    <>
                      {/* Email Input */}
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="off"
                          className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                          style={{
                            fontFamily: 'Poppins',
                            backgroundColor: 'rgba(217, 119, 6, 0.2)',
                            borderColor: 'rgba(217, 119, 6, 0.3)',
                          }}
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new-password"
                          className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                          style={{
                            fontFamily: 'Poppins',
                            backgroundColor: 'rgba(217, 119, 6, 0.2)',
                            borderColor: 'rgba(217, 119, 6, 0.3)',
                          }}
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 2FA Code Input */}
                      <div className="text-center mb-4">
                        <h3
                          className="text-xl font-semibold text-amber-100 mb-2"
                          style={{ fontFamily: 'Poppins' }}
                        >
                          Two-Factor Authentication
                        </h3>
                        <p
                          className="text-amber-200 text-sm"
                          style={{ fontFamily: 'Poppins' }}
                        >
                          Enter the 6-digit code from your authenticator app
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="000000"
                          value={totpCode}
                          onChange={(e) =>
                            setTotpCode(
                              e.target.value.replace(/\D/g, '').slice(0, 6)
                            )
                          }
                          maxLength={6}
                          className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition text-center text-2xl tracking-widest"
                          style={{
                            fontFamily: 'Poppins',
                            backgroundColor: 'rgba(217, 119, 6, 0.2)',
                            borderColor: 'rgba(217, 119, 6, 0.3)',
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setNeeds2FA(false);
                          setTotpCode('');
                          setError('');
                        }}
                        className="text-amber-200 text-sm hover:text-amber-100 transition"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        ← Back to login
                      </button>
                    </>
                  )}

                  {!needs2FA && (
                    <>
                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between text-amber-100 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) =>
                              setRememberMe(e.target.checked)
                            }
                            className="w-4 h-4 rounded bg-amber-900/40 border-amber-500/40 text-amber-600 focus:ring-amber-500"
                          />
                          <span style={{ fontFamily: 'Poppins' }}>
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          className="hover:text-amber-200 transition"
                          style={{ fontFamily: 'Poppins' }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-200 text-sm text-center bg-red-900/40 py-2 px-4 rounded-full border border-red-500/30">
                      {error}
                    </div>
                  )}

                  {/* Login/Verify Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    {loading
                      ? needs2FA
                        ? 'Verifying...'
                        : 'Logging in...'
                      : needs2FA
                      ? 'Verify Code'
                      : 'Login'}
                  </button>

                  {/* Register Link */}
                  <div className="text-center text-amber-100">
                    <span style={{ fontFamily: 'Poppins' }}>
                      Don't have an account?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={() => router.push('/register')}
                      className="font-semibold hover:text-amber-200 transition"
                      style={{ fontFamily: 'Poppins' }}
                    >
                      Register
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Mode Content */}
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <svg
                          viewBox="0 0 120 120"
                          fill="none"
                          className="w-full h-full"
                        >
                          {/* Base */}
                          <rect
                            x="15"
                            y="95"
                            width="90"
                            height="8"
                            fill="white"
                            rx="2"
                          />
                          {/* Columns */}
                          <rect
                            x="25"
                            y="50"
                            width="12"
                            height="45"
                            fill="white"
                            rx="2"
                          />
                          <rect
                            x="42"
                            y="50"
                            width="12"
                            height="45"
                            fill="white"
                            rx="2"
                          />
                          <rect
                            x="59"
                            y="50"
                            width="12"
                            height="45"
                            fill="white"
                            rx="2"
                          />
                          <rect
                            x="76"
                            y="50"
                            width="12"
                            height="45"
                            fill="white"
                            rx="2"
                          />
                          {/* Pediment (roof) */}
                          <path
                            d="M10 50 L60 20 L110 50 L100 50 L60 28 L20 50 Z"
                            fill="white"
                          />
                          {/* Top platform */}
                          <rect
                            x="20"
                            y="48"
                            width="80"
                            height="6"
                            fill="white"
                            rx="1"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3
                      className="text-2xl font-bold text-amber-100 mb-3"
                      style={{ fontFamily: 'Poppins' }}
                    >
                      Explore as Guest
                    </h3>
                    <p
                      className="text-amber-200 mb-6"
                      style={{ fontFamily: 'Poppins' }}
                    >
                      Discover the sacred monasteries of Sikkim, explore
                      digital archives, and experience virtual tours without
                      logging in.
                    </p>
                  </div>

                  {/* Continue as Guest Button */}
                  <button
                    type="button"
                    onClick={handleGuestExplore}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    Continue as Guest
                  </button>

                  <div
                    className="text-center text-amber-200 text-sm"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    No account required • Full access to explore
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
