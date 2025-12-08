'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Registration logic here
    console.log('Register:', formData);
    router.push('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#410704' }}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/design.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '400px auto',
          }}
        />
        {/* Animated particles */}
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
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div
            className="rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
            style={{
              background: 'rgba(217, 119, 6, 0.15)',
              border: '2px solid rgba(217, 119, 6, 0.3)',
            }}
          >
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-amber-100 mb-2" style={{ fontFamily: 'Poppins' }}>
                Register
              </h1>
              <p className="text-amber-200 text-sm" style={{ fontFamily: 'Poppins' }}>
                Create your admin account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                  style={{ 
                    fontFamily: 'Poppins',
                    backgroundColor: 'rgba(217, 119, 6, 0.2)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                  }}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                  style={{ 
                    fontFamily: 'Poppins',
                    backgroundColor: 'rgba(217, 119, 6, 0.2)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                  }}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>

              {/* Username Input */}
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                  style={{ 
                    fontFamily: 'Poppins',
                    backgroundColor: 'rgba(217, 119, 6, 0.2)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                  }}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                  style={{ 
                    fontFamily: 'Poppins',
                    backgroundColor: 'rgba(217, 119, 6, 0.2)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                  }}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full backdrop-blur-sm border-2 text-amber-100 placeholder-amber-300/60 focus:outline-none transition"
                  style={{ 
                    fontFamily: 'Poppins',
                    backgroundColor: 'rgba(217, 119, 6, 0.2)',
                    borderColor: 'rgba(217, 119, 6, 0.3)',
                  }}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-amber-300/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-200 text-sm text-center bg-red-900/40 py-2 px-4 rounded-full border border-red-500/30">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{ fontFamily: 'Poppins' }}
              >
                Create Account
              </button>

              {/* Login Link */}
              <div className="text-center text-amber-100">
                <span style={{ fontFamily: 'Poppins' }}>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="font-semibold hover:text-amber-200 transition"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
