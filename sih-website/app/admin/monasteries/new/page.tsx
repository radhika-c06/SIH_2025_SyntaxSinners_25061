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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<'Draft' | 'Published'>('Draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSave = async (status: 'Draft' | 'Published') => {
    // Show confirmation dialog
    setConfirmationStatus(status);
    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!formData.name || !formData.location) {
        setError('Monastery name and location are required');
        setShowConfirmation(false);
        setLoading(false);
        return;
      }

      const monasteryData = {
        name: formData.name,
        slug: formData.slug,
        location: formData.location,
        district: '',
        altitude: formData.altitude,
        founded: formData.founded,
        shortDescription: formData.shortDescription,
        heroImageUrl: formData.heroImage,
        gallery: formData.gallery.filter(img => img.trim()),
        sections: Object.entries(formData.sections)
          .filter(([, content]) => content.trim())
          .map(([key, content]) => ({
            key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            content,
          })),
        isPublished: confirmationStatus === 'Published',
      };

      const response = await fetch('/api/monasteries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(monasteryData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save monastery');
      }

      setShowConfirmation(false);
      router.push('/admin/monasteries');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save monastery');
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
                {error}
              </div>
            )}
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
                  disabled={loading}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleSave(formData.status)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins' }}
                >
                  {loading ? 'Saving...' : 'Save Monastery'}
                </button>
                <button
                  onClick={() => handleSave('Draft')}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-semibold transition border border-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => router.back()}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Poppins' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="rounded-2xl p-8 max-w-md w-full backdrop-blur-sm"
            style={{
              background: 'rgba(217, 119, 6, 0.15)',
              border: '2px solid rgba(217, 119, 6, 0.3)',
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
              Confirm {confirmationStatus === 'Published' ? 'Publishing' : 'Saving as Draft'}
            </h3>
            
            <div className="mb-6 p-4 rounded-lg bg-amber-900/20 border border-amber-500/30">
              <p className="text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                <strong>Monastery:</strong> {formData.name}
              </p>
              <p className="text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                <strong>Location:</strong> {formData.location}
              </p>
              <p className="text-amber-100" style={{ fontFamily: 'Poppins' }}>
                <strong>Status:</strong> <StatusBadge status={confirmationStatus} />
              </p>
            </div>

            {confirmationStatus === 'Published' && (
              <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-green-100 text-sm" style={{ fontFamily: 'Poppins' }}>
                  ✓ This monastery will be visible on the main website and public pages immediately after confirmation.
                </p>
              </div>
            )}

            {confirmationStatus === 'Draft' && (
              <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-100 text-sm" style={{ fontFamily: 'Poppins' }}>
                  ℹ This monastery will be saved as a draft and only visible in the admin dashboard. You can publish it later.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={confirmSave}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Poppins' }}
              >
                {loading ? 'Saving...' : `Yes, ${confirmationStatus === 'Published' ? 'Publish' : 'Save as Draft'}`}
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-semibold transition border border-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Poppins' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
