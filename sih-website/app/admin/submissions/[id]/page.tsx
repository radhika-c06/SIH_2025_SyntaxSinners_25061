'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import StatusBadge from '@/components/admin/StatusBadge';

// Mock data
const mockSubmission = {
  id: '1',
  monasteryName: 'Pemayangtse Monastery',
  contributorName: 'Rajesh Kumar',
  contributorEmail: 'rajesh.k@email.com',
  status: 'Pending' as 'Pending' | 'Approved' | 'Rejected',
  submittedOn: '2024-12-05',
  rawContent: {
    basicInfo: {
      name: 'Pemayangtse Monastery',
      location: 'Pelling, Sikkim',
      altitude: '2,085 m',
      founded: '1705',
    },
    description: 'One of the oldest and premier monasteries of Sikkim, belonging to the Nyingma order. The monastery is known for its spiritual significance and architectural beauty. It houses many sacred Buddhist texts and artifacts. The monastery offers panoramic views of the Kangchenjunga mountain range.',
    additionalNotes: 'This monastery has great historical significance and should be added to the collection.',
  },
};

export default function SubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    // TODO: Implement approval logic
    console.log('Approving submission:', { id: params.id, reviewNotes });
    setTimeout(() => {
      router.push('/admin/submissions');
    }, 1000);
  };

  const handleReject = async () => {
    if (!reviewNotes) {
      alert('Please provide review notes before rejecting');
      return;
    }
    setIsProcessing(true);
    // TODO: Implement rejection logic
    console.log('Rejecting submission:', { id: params.id, reviewNotes });
    setTimeout(() => {
      router.push('/admin/submissions');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
              {mockSubmission.monasteryName}
            </h1>
            <StatusBadge status={mockSubmission.status} size="lg" />
          </div>
          <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
            Submission Review
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
                  {mockSubmission.contributorName}
                </p>
              </div>
              <div>
                <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Email</p>
                <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                  {mockSubmission.contributorEmail}
                </p>
              </div>
              <div>
                <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Submitted On</p>
                <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                  {new Date(mockSubmission.submittedOn).toLocaleDateString()}
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
              Submitted Content
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
                      {mockSubmission.rawContent.basicInfo.name}
                    </p>
                  </div>
                  <div className="bg-amber-900/20 rounded-lg p-4">
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Location</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {mockSubmission.rawContent.basicInfo.location}
                    </p>
                  </div>
                  <div className="bg-amber-900/20 rounded-lg p-4">
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Altitude</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {mockSubmission.rawContent.basicInfo.altitude || 'Not provided'}
                    </p>
                  </div>
                  <div className="bg-amber-900/20 rounded-lg p-4">
                    <p className="text-sm text-amber-300/70 mb-1" style={{ fontFamily: 'Poppins' }}>Founded</p>
                    <p className="text-amber-100 font-medium" style={{ fontFamily: 'Poppins' }}>
                      {mockSubmission.rawContent.basicInfo.founded || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                  Description
                </h3>
                <div className="bg-amber-900/20 rounded-lg p-4">
                  <p className="text-amber-200 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                    {mockSubmission.rawContent.description}
                  </p>
                </div>
              </div>

              {/* Additional Notes */}
              {mockSubmission.rawContent.additionalNotes && (
                <div>
                  <h3 className="text-lg font-semibold text-amber-100 mb-3" style={{ fontFamily: 'Poppins' }}>
                    Additional Notes
                  </h3>
                  <div className="bg-amber-900/20 rounded-lg p-4">
                    <p className="text-amber-200 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
                      {mockSubmission.rawContent.additionalNotes}
                    </p>
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
              {mockSubmission.status === 'Pending' && (
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
                    Approve & Create Monastery
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

              {mockSubmission.status === 'Approved' && (
                <Link
                  href="/admin/monasteries"
                  className="block w-full px-4 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold text-center transition"
                  style={{ fontFamily: 'Poppins' }}
                >
                  View Linked Monastery
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
