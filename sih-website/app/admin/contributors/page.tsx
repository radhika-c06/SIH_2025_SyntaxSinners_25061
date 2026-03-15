'use client';

import React, { useState } from 'react';
import { Contributor } from '@/types/admin';

// Mock data
const mockContributors: Contributor[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    totalSubmissions: 5,
    approved: 4,
    lastSubmissionDate: '2024-12-05',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    totalSubmissions: 8,
    approved: 7,
    lastSubmissionDate: '2024-12-01',
  },
  {
    id: '3',
    name: 'Tenzin Dorje',
    email: 'tenzin.d@email.com',
    totalSubmissions: 3,
    approved: 2,
    lastSubmissionDate: '2024-12-07',
  },
  {
    id: '4',
    name: 'Mingma Sherpa',
    email: 'mingma.s@email.com',
    totalSubmissions: 6,
    approved: 5,
    lastSubmissionDate: '2024-12-06',
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david.lee@email.com',
    totalSubmissions: 12,
    approved: 11,
    lastSubmissionDate: '2024-12-03',
  },
  {
    id: '6',
    name: 'Priya Sharma',
    email: 'priya.s@email.com',
    totalSubmissions: 4,
    approved: 3,
    lastSubmissionDate: '2024-11-29',
  },
  {
    id: '7',
    name: 'John Doe',
    email: 'john.doe@email.com',
    totalSubmissions: 2,
    approved: 0,
    lastSubmissionDate: '2024-11-28',
  },
];

export default function ContributorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContributors = mockContributors.filter((contributor) => {
    return (
      contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 bg-amber-950 min-h-screen p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-50 mb-2" style={{ fontFamily: 'Poppins' }}>
          Contributors
        </h1>
        <p className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
          Manage contributors and track their submissions
        </p>
      </div>

      {/* Search */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-800/40 border border-amber-700/50 text-amber-50 placeholder-amber-300/50 focus:outline-none focus:border-amber-600/50 transition"
            style={{ fontFamily: 'Poppins' }}
          />
          <svg
            className="w-5 h-5 text-amber-300/50 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Contributors Table */}
      <div
        className="rounded-2xl overflow-hidden backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-800/50 bg-amber-900/60">
                <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Name
                </th>
                <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Email
                </th>
                <th className="text-center px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Total Submissions
                </th>
                <th className="text-center px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Approved
                </th>
                <th className="text-left px-6 py-4 text-amber-50 font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Last Submission
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContributors.map((contributor) => (
                <tr
                  key={contributor.id}
                  className="border-b border-amber-800/30 hover:bg-amber-800/30 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-amber-900 font-bold text-sm">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-amber-50 font-medium" style={{ fontFamily: 'Poppins' }}>
                        {contributor.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-200" style={{ fontFamily: 'Poppins' }}>
                    {contributor.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-800/60 text-amber-100 font-semibold">
                      {contributor.totalSubmissions}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-900/60 text-green-300 font-semibold">
                      {contributor.approved}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-amber-200" style={{ fontFamily: 'Poppins' }}>
                    {new Date(contributor.lastSubmissionDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
        >
          <p className="text-sm text-amber-200 mb-2" style={{ fontFamily: 'Poppins' }}>
            Total Contributors
          </p>
          <p className="text-4xl font-bold text-amber-50" style={{ fontFamily: 'Poppins' }}>
            {mockContributors.length}
          </p>
        </div>

        <div
          className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
        >
          <p className="text-sm text-amber-200 mb-2" style={{ fontFamily: 'Poppins' }}>
            Total Submissions
          </p>
          <p className="text-4xl font-bold text-amber-50" style={{ fontFamily: 'Poppins' }}>
            {mockContributors.reduce((sum, c) => sum + c.totalSubmissions, 0)}
          </p>
        </div>

        <div
          className="rounded-2xl p-6 backdrop-blur-sm bg-amber-900/40 border border-amber-800/50"
        >
          <p className="text-sm text-amber-200 mb-2" style={{ fontFamily: 'Poppins' }}>
            Approval Rate
          </p>
          <p className="text-4xl font-bold text-green-300" style={{ fontFamily: 'Poppins' }}>
            {Math.round(
              (mockContributors.reduce((sum, c) => sum + c.approved, 0) /
                mockContributors.reduce((sum, c) => sum + c.totalSubmissions, 0)) *
                100
            )}%
          </p>
        </div>
      </div>
    </div>
  );
}
