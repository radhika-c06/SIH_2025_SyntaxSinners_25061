'use client';

import React, { useState } from 'react';

export default function MediaPage() {
  const [files] = useState([
    { id: '1', name: 'rumtek-hero.jpg', size: '2.4 MB', type: 'image', url: '/rumtek/rumtek1.avif' },
    { id: '2', name: 'tashiding-gallery-1.jpg', size: '1.8 MB', type: 'image', url: '/tashiding/tashiding1.avif' },
    { id: '3', name: 'dubdi-overview.jpg', size: '3.1 MB', type: 'image', url: '/dubdi/dubdi1.avif' },
    { id: '4', name: 'meditation-audio.mp3', size: '5.2 MB', type: 'audio', url: '/audio/meditation.mp3' },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
            Media Library
          </h1>
          <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
            Manage images, videos, and audio files
          </p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-semibold transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          style={{ fontFamily: 'Poppins' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Files
        </button>
      </div>

      {/* Media Grid */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group relative rounded-lg overflow-hidden bg-amber-900/30 hover:bg-amber-900/50 transition cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-amber-950 to-orange-950 flex items-center justify-center">
                {file.type === 'image' ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${file.url})` }}
                  />
                ) : (
                  <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                )}
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium truncate" style={{ fontFamily: 'Poppins' }}>
                  {file.name}
                </p>
                <p className="text-gray-400 text-xs" style={{ fontFamily: 'Poppins' }}>
                  {file.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
