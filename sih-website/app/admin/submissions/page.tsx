'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { Submission } from '@/types/admin';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both media submissions and data contributions
      const [mediaResponse, dataResponse] = await Promise.all([
        fetch('/api/submissions/media'),
        fetch('/api/data-contribution'),
      ]);

      if (!mediaResponse.ok && !dataResponse.ok) {
        throw new Error('Failed to fetch submissions');
      }

      let allSubmissions: any[] = [];

      // Get media submissions
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json();
        allSubmissions = [...allSubmissions, ...mediaData];
      }

      // Get data contributions
      if (dataResponse.ok) {
        const dataData = await dataResponse.json();
        const formattedData = dataData.map((item: any) => ({
          id: item._id || item.id,
          title: item.monastery,
          monasteryName: item.monastery,
          contributorName: item.contributorName,
          contributorEmail: item.contributorEmail,
          type: `${item.dataType} (Data)`,
          status: item.status || 'pending',
          submittedOn: item.timestamp || item.createdAt,
          ...item,
        }));
        allSubmissions = [...allSubmissions, ...formattedData];
      }

      setSubmissions(allSubmissions);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    return statusFilter === 'All' || submission.status === statusFilter;
  });

  const getStatusCapitalized = (status: string | undefined): 'Pending' | 'Approved' | 'Rejected' => {
    if (!status) return 'Pending';
    return (status.charAt(0).toUpperCase() + status.slice(1)) as any;
  };

  return (
    <div className="space-y-6 bg-amber-950 min-h-screen p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-50 mb-2" style={{ fontFamily: 'Poppins' }}>
          Submissions
        </h1>
        <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
          Review and manage media and monastery submissions from contributors
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-2xl p-4 bg-red-950/60 border border-red-900/50 text-red-200" style={{ fontFamily: 'Poppins' }}>
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-500 border-t-transparent"></div>
            <p className="text-amber-100" style={{ fontFamily: 'Poppins' }}>Loading submissions...</p>
          </div>
        </div>
      )}

      {/* Filter Chips */}
      {!loading && (
        <div
          className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
        >
          <div className="flex flex-wrap gap-2">
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === status
                    ? 'bg-amber-600 text-amber-50'
                    : 'bg-amber-800/50 text-amber-200 hover:bg-amber-800/70'
                }`}
                style={{ fontFamily: 'Poppins' }}
              >
                {status} ({submissions.filter(s => status === 'All' || s.status === status).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submissions Table */}
      {!loading && (
        <div
          className="rounded-2xl overflow-hidden backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
        >
          <div className="overflow-x-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-amber-700" style={{ fontFamily: 'Poppins' }}>
                  No submissions found
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-800/50 bg-amber-900/60">
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Title
                    </th>
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Monastery Name
                    </th>
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Contributor
                    </th>
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Type
                    </th>
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Submitted On
                    </th>
                    <th className="text-right px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-amber-800/30 hover:bg-amber-800/30 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="text-amber-50 font-medium" style={{ fontFamily: 'Poppins' }}>
                          {submission.title}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-amber-50 font-medium" style={{ fontFamily: 'Poppins' }}>
                          {submission.monasteryName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-amber-50 font-medium" style={{ fontFamily: 'Poppins' }}>
                          {submission.contributorName}
                        </p>
                        <p className="text-sm text-amber-300" style={{ fontFamily: 'Poppins' }}>
                          {submission.contributorEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-800/60 text-amber-100">
                          {submission.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={getStatusCapitalized(submission.status)} />
                      </td>
                      <td className="px-6 py-4 text-amber-200" style={{ fontFamily: 'Poppins' }}>
                        {new Date(submission.submittedOn).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/submissions/${submission.id}`}
                            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-amber-50 font-medium transition"
                            style={{ fontFamily: 'Poppins' }}
                          >
                            Review
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
