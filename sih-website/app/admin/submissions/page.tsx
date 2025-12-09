'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { Submission } from '@/types/admin';

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: '1',
    monasteryName: 'Pemayangtse Monastery',
    contributorName: 'Rajesh Kumar',
    contributorEmail: 'rajesh.k@email.com',
    status: 'Pending',
    submittedOn: '2024-12-05',
    rawContent: {
      basicInfo: {
        name: 'Pemayangtse Monastery',
        location: 'Pelling, Sikkim',
        altitude: '2,085 m',
        founded: '1705',
      },
      description: 'One of the oldest and premier monasteries of Sikkim...',
    },
  },
  {
    id: '2',
    monasteryName: 'Enchey Monastery',
    contributorName: 'Sarah Chen',
    contributorEmail: 'sarah.chen@email.com',
    status: 'Approved',
    submittedOn: '2024-12-01',
    rawContent: {
      basicInfo: {
        name: 'Enchey Monastery',
        location: 'Gangtok, Sikkim',
        altitude: '1,840 m',
        founded: '1909',
      },
      description: 'A 200-year-old monastery located in Gangtok...',
    },
    linkedMonasteryId: '6',
  },
  {
    id: '3',
    monasteryName: 'Invalid Monastery Entry',
    contributorName: 'John Doe',
    contributorEmail: 'john.doe@email.com',
    status: 'Rejected',
    submittedOn: '2024-11-28',
    rawContent: {
      basicInfo: {
        name: 'Invalid Monastery Entry',
        location: 'Unknown',
      },
      description: 'Incomplete information...',
    },
    reviewNotes: 'Insufficient information provided. Please resubmit with complete details.',
  },
  {
    id: '4',
    monasteryName: 'Ralang Monastery',
    contributorName: 'Tenzin Dorje',
    contributorEmail: 'tenzin.d@email.com',
    status: 'Pending',
    submittedOn: '2024-12-07',
    rawContent: {
      basicInfo: {
        name: 'Ralang Monastery',
        location: 'Ralang, Sikkim',
        altitude: '1,600 m',
        founded: '1768',
      },
      description: 'A beautiful monastery known for its annual festivals...',
    },
  },
  {
    id: '5',
    monasteryName: 'Sang Ngag Chöling Monastery',
    contributorName: 'Mingma Sherpa',
    contributorEmail: 'mingma.s@email.com',
    status: 'Pending',
    submittedOn: '2024-12-06',
    rawContent: {
      basicInfo: {
        name: 'Sang Ngag Chöling Monastery',
        location: 'Pelling, Sikkim',
        altitude: '2,000 m',
        founded: '1697',
      },
      description: 'One of the oldest monasteries in Sikkim...',
    },
  },
];

export default function SubmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    return statusFilter === 'All' || submission.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
          Submissions
        </h1>
        <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
          Review and manage monastery submissions from contributors
        </p>
      </div>

      {/* Filter Chips */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <div className="flex flex-wrap gap-2">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                statusFilter === status
                  ? 'bg-amber-500 text-amber-900'
                  : 'bg-amber-900/30 text-amber-100 hover:bg-amber-900/50'
              }`}
              style={{ fontFamily: 'Poppins' }}
            >
              {status} ({mockSubmissions.filter(s => status === 'All' || s.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div
        className="rounded-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-800/30">
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Monastery Name
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Contributor
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Status
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Submitted On
                </th>
                <th className="text-right px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-amber-800/20 hover:bg-amber-900/20 transition"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium" style={{ fontFamily: 'Poppins' }}>
                      {submission.monasteryName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium" style={{ fontFamily: 'Poppins' }}>
                      {submission.contributorName}
                    </p>
                    <p className="text-sm text-gray-400" style={{ fontFamily: 'Poppins' }}>
                      {submission.contributorEmail}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="px-6 py-4 text-amber-200" style={{ fontFamily: 'Poppins' }}>
                    {new Date(submission.submittedOn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-900 font-medium transition"
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
        </div>
      </div>
    </div>
  );
}
