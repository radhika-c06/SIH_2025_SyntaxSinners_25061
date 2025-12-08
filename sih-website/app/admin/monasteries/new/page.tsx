'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusBadge from '@/components/admin/StatusBadge';

export default function NewMonasteryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    location: '',
    altitude: '',
    founded: '',
    shortDescription: '',
    heroImage: '',
    gallery: [''],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Draft' as 'Draft' | 'Published',
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...formData.gallery, ''],
    });
  };

  const updateGalleryImage = (index: number, value: string) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData({
      ...formData,
      gallery: newGallery,
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index),
    });
  };

  const handleSave = (status: 'Draft' | 'Published') => {
    // TODO: Implement save logic
    console.log('Saving monastery:', { ...formData, status });
    router.push('/admin/monasteries');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
            Add New Monastery
          </h1>
          <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
            Create a new monastery listing
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-medium transition"
          style={{ fontFamily: 'Poppins' }}
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div
            className="rounded-2xl p-6 backdrop-blur-sm"
            style={{
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Monastery Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                  placeholder="Enter monastery name"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>

              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                  placeholder="auto-generated-from-name"
                  style={{ fontFamily: 'Poppins' }}
                />
                <p className="text-sm text-amber-300/60 mt-1" style={{ fontFamily: 'Poppins' }}>
                  Auto-generated from name. Edit if needed.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                    placeholder="e.g., Rumtek, Sikkim"
                    style={{ fontFamily: 'Poppins' }}
                  />
                </div>

                <div>
                  <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                    Altitude
                  </label>
                  <input
                    type="text"
                    value={formData.altitude}
                    onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                    placeholder="e.g., 1,550 m"
                    style={{ fontFamily: 'Poppins' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Founded
                </label>
                <input
                  type="text"
                  value={formData.founded}
                  onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                  placeholder="e.g., 1960"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>

              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Short Description *
                </label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition resize-none"
                  placeholder="Brief description for listings and previews"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div
            className="rounded-2xl p-6 backdrop-blur-sm"
            style={{
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Media
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Hero Image URL *
                </label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                  placeholder="/path/to/hero-image.jpg"
                  style={{ fontFamily: 'Poppins' }}
                />
              </div>

              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Gallery Images
                </label>
                <div className="space-y-2">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => updateGalleryImage(index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
                        placeholder="/path/to/gallery-image.jpg"
                        style={{ fontFamily: 'Poppins' }}
                      />
                      {formData.gallery.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="px-4 py-3 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addGalleryImage}
                  className="mt-2 px-4 py-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-medium transition inline-flex items-center gap-2"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Image
                </button>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div
            className="rounded-2xl p-6 backdrop-blur-sm"
            style={{
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Content Sections
            </h2>
            <div className="space-y-6">
              {Object.entries({
                overview: 'Overview',
                history: 'History',
                architecture: 'Architecture',
                rituals: 'Rituals',
                bestVisitTime: 'Best Visit Time',
                travelInfo: 'Travel Info',
                digitalArchive: 'Digital Archive',
              }).map(([key, label]) => (
                <div key={key}>
                  <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                    {label}
                  </label>
                  <textarea
                    value={formData.sections[key as keyof typeof formData.sections]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sections: { ...formData.sections, [key]: e.target.value },
                      })
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition resize-none"
                    placeholder={`Enter ${label.toLowerCase()} content...`}
                    style={{ fontFamily: 'Poppins' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <div
            className="rounded-2xl p-6 backdrop-blur-sm sticky top-24"
            style={{
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Preview
            </h2>
            <div className="space-y-4">
              {formData.heroImage && (
                <div
                  className="w-full h-32 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${formData.heroImage})` }}
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Poppins' }}>
                  {formData.name || 'Monastery Name'}
                </h3>
                <p className="text-sm text-amber-200 mb-2" style={{ fontFamily: 'Poppins' }}>
                  {formData.location || 'Location'}
                </p>
                <StatusBadge status={formData.status} />
              </div>
              {formData.shortDescription && (
                <p className="text-sm text-amber-200" style={{ fontFamily: 'Poppins' }}>
                  {formData.shortDescription}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div
            className="rounded-2xl p-6 backdrop-blur-sm"
            style={{
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
              Publish
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Draft' | 'Published' })}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 focus:outline-none focus:border-amber-500/50 transition"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleSave(formData.status)}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold transition shadow-lg hover:shadow-xl"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Save Monastery
                </button>
                <button
                  onClick={() => handleSave('Draft')}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-semibold transition border border-amber-500/30"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-semibold transition"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
