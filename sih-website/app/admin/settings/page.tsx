'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: 'Sangha',
    siteTagline: 'Explore the Sacred Monasteries of Sikkim',
    logoUrl: '/logo.png',
    primaryColor: '#d97706',
    mapsApiKey: '',
    storageApiKey: '',
    emailNotifications: true,
    autoApproveFromTrusted: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
          Settings
        </h1>
        <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
          Configure your Sangha admin dashboard
        </p>
      </div>

      {/* Site Settings */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
          Site Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Site Title
            </label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
              style={{ fontFamily: 'Poppins' }}
            />
          </div>

          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Site Tagline
            </label>
            <input
              type="text"
              value={settings.siteTagline}
              onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
              style={{ fontFamily: 'Poppins' }}
            />
          </div>
        </div>
      </div>

      {/* Branding */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
          Branding
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Logo URL
            </label>
            <input
              type="text"
              value={settings.logoUrl}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
              placeholder="/path/to/logo.png"
              style={{ fontFamily: 'Poppins' }}
            />
          </div>

          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Primary Color
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="h-12 w-20 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                style={{ fontFamily: 'Poppins' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* API Integration */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
          Travel & Integration
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Google Maps API Key
            </label>
            <input
              type="password"
              value={settings.mapsApiKey}
              onChange={(e) => setSettings({ ...settings, mapsApiKey: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
              placeholder="Enter API key"
              style={{ fontFamily: 'Poppins' }}
            />
          </div>

          <div>
            <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
              Storage API Key
            </label>
            <input
              type="password"
              value={settings.storageApiKey}
              onChange={(e) => setSettings({ ...settings, storageApiKey: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
              placeholder="Enter API key"
              style={{ fontFamily: 'Poppins' }}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
          Preferences
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="w-5 h-5 rounded bg-amber-900/40 border-amber-500/40 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <p className="text-white font-medium" style={{ fontFamily: 'Poppins' }}>
                Email Notifications
              </p>
              <p className="text-sm text-amber-200" style={{ fontFamily: 'Poppins' }}>
                Receive email notifications for new submissions
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoApproveFromTrusted}
              onChange={(e) => setSettings({ ...settings, autoApproveFromTrusted: e.target.checked })}
              className="w-5 h-5 rounded bg-amber-900/40 border-amber-500/40 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <p className="text-white font-medium" style={{ fontFamily: 'Poppins' }}>
                Auto-approve from Trusted Contributors
              </p>
              <p className="text-sm text-amber-200" style={{ fontFamily: 'Poppins' }}>
                Automatically approve submissions from verified contributors
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div>
          {saved && (
            <p className="text-green-400 font-medium flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully!
            </p>
          )}
        </div>
        <button
          onClick={handleSave}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold transition shadow-lg hover:shadow-xl"
          style={{ fontFamily: 'Poppins' }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
