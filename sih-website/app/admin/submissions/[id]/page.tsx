'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';

export default function SubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchSubmission();
    }
  }, [params.id]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/submissions/media/${params.id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Submission not found');
        }
        throw new Error('Failed to fetch submission');
      }

      const data = await response.json();
      setSubmission(data);
    } catch (err) {
      console.error('Error fetching submission:', err);
      setError(err instanceof Error ? err.message : 'Failed to load submission');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!submission) return;
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/submissions/media/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
          reviewNotes,
          reviewedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve submission');
      }

      alert('Submission approved successfully!');
      router.push('/admin/submissions');
    } catch (err) {
      console.error('Error approving submission:', err);
      alert('Failed to approve submission');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!reviewNotes) {
      alert('Please provide review notes before rejecting');
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/submissions/media/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rejected',
          reviewNotes,
          reviewedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject submission');
      }

      alert('Submission rejected successfully!');
      router.push('/admin/submissions');
    } catch (err) {
      console.error('Error rejecting submission:', err);
      alert('Failed to reject submission');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error State */}
      {error && (
        <div className="rounded-2xl p-4 bg-red-900/30 border border-red-700/50 text-red-200">
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl p-6 backdrop-blur-sm" style={{ background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent"></div>
            <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>Loading submission...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && submission && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
                  {submission.title}
                </h1>
                <StatusBadge status={submission.status.charAt(0).toUpperCase() + submission.status.slice(1)} size="lg" />
              </div>
              <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
                {submission.type === 'ocr' ? 'OCR Submission' : 'Media Submission'} Review
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-medium transition"
              style={{ fontFamily: 'Poppins' }}
            >
              ← Back to Submissions
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contributor Info */}
              <div
                className="rounded-2xl p-6 backdrop-blur-sm"
                style={{
                  background: 'rgba(217, 119, 6, 0.1)',
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                }}
              >
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
                  Contributor Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Name</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {submission.contributorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Email</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {submission.contributorEmail || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Submitted On</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {new Date(submission.submittedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Type</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {submission.type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submitted Content */}
              <div
                className="rounded-2xl p-6 backdrop-blur-sm"
                style={{
                  background: 'rgba(217, 119, 6, 0.1)',
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                }}
              >
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
                  Submission Details
                </h2>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-amber-100 mb-4" style={{ fontFamily: 'Poppins' }}>
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-amber-900/20 rounded-lg p-4">
                        <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Monastery Name</p>
                        <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                          {submission.monasteryName}
                        </p>
                      </div>
                      <div className="bg-amber-900/20 rounded-lg p-4">
                        <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Location</p>
                        <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                          {submission.location || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {submission.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                        Description
                      </h3>
                      <div className="bg-amber-900/20 rounded-lg p-4">
                        <p className="text-amber-200 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                          {submission.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* OCR Data */}
                  {submission.ocrData && (
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                        OCR Extracted Text
                      </h3>
                      <div className="bg-amber-900/20 rounded-lg p-4">
                        <div className="mb-4">
                          <p className="text-sm text-amber-300/70 mb-2" style={{ fontFamily: 'Poppins' }}>Language</p>
                          <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
                            {submission.ocrData.language}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-300/70 mb-2" style={{ fontFamily: 'Poppins' }}>Cleaned Text</p>
                          <p className="text-amber-200 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Poppins' }}>
                            {submission.ocrData.cleanedText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media Files */}
                  {submission.mediaFiles && submission.mediaFiles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                        Media Files
                      </h3>
                      <div className="bg-amber-900/20 rounded-lg p-4">
                        {submission.mediaFiles.map((file: any, idx: number) => (
                          <div key={idx} className="mb-4 last:mb-0">
                            {file.type === 'image' && file.data && (
                              <img 
                                src={file.data} 
                                alt={`Media ${idx}`}
                                className="max-w-full h-auto rounded"
                              />
                            )}
                            <p className="text-sm text-amber-300/70 mt-2">{file.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {submission.tags && submission.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {submission.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm bg-amber-600/30 text-amber-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Review Actions */}
              <div
                className="rounded-2xl p-6 backdrop-blur-sm sticky top-24"
                style={{
                  background: 'rgba(217, 119, 6, 0.1)',
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                }}
              >
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins' }}>
                  Review Actions
                </h2>

                <div className="space-y-4">
                  {/* Review Notes */}
                  <div>
                    <label className="block text-amber-200 font-medium mb-2" style={{ fontFamily: 'Poppins' }}>
                      Review Notes
                    </label>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-amber-900/30 border border-amber-500/30 text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition resize-none"
                      placeholder="Add notes about this review..."
                      style={{ fontFamily: 'Poppins' }}
                    />
                  </div>

                  {/* Action Buttons */}
                  {submission.status === 'pending' && (
                    <div className="space-y-2">
                      <button
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>

                      <button
                        onClick={handleReject}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject Submission
                      </button>
                    </div>
                  )}

                  {/* Show status if not pending */}
                  {submission.status !== 'pending' && (
                    <div className="bg-amber-900/20 rounded-lg p-4">
                      <p className="text-sm text-amber-300/70 mb-2">Status</p>
                      <p className="text-amber-100 font-medium capitalize">
                        {submission.status}
                      </p>
                      {submission.reviewedAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          Reviewed on {new Date(submission.reviewedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href="/admin/submissions"
                    className="block w-full px-4 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold text-center transition mt-4"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    Back to All Submissions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
