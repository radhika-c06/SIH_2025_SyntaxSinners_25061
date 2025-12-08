'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { Monastery } from '@/types/admin';

// Mock data
const mockMonasteries: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    slug: 'rumtek-monastery',
    location: 'Rumtek, Sikkim',
    altitude: '1,550 m',
    founded: '1960',
    shortDescription: 'The largest monastery in Sikkim',
    heroImage: '/rumtek/rumtek1.avif',
    gallery: [],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Published',
    lastUpdated: '2024-12-01',
    createdAt: '2024-11-15',
  },
  {
    id: '2',
    name: 'Tashiding Monastery',
    slug: 'tashiding-monastery',
    location: 'Tashiding, Sikkim',
    altitude: '1,400 m',
    founded: '1641',
    shortDescription: 'Sacred Buddhist pilgrimage site',
    heroImage: '/tashiding/tashiding1.avif',
    gallery: [],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Published',
    lastUpdated: '2024-11-28',
    createdAt: '2024-11-10',
  },
  {
    id: '3',
    name: 'Dubdi Monastery',
    slug: 'dubdi-monastery',
    location: 'Yuksom, Sikkim',
    altitude: '2,100 m',
    founded: '1701',
    shortDescription: 'First monastery of Sikkim',
    heroImage: '/dubdi/dubdi1.avif',
    gallery: [],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Published',
    lastUpdated: '2024-11-25',
    createdAt: '2024-11-05',
  },
  {
    id: '4',
    name: 'Tsuk Monastery',
    slug: 'tsuk-monastery',
    location: 'Tsuk, Sikkim',
    altitude: '1,800 m',
    founded: '1880',
    shortDescription: 'Historic Nyingma monastery',
    heroImage: '/tsuk/tsuk.avif',
    gallery: [],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Draft',
    lastUpdated: '2024-12-05',
    createdAt: '2024-12-01',
  },
  {
    id: '5',
    name: 'Pemayangtse Monastery',
    slug: 'pemayangtse-monastery',
    location: 'Pelling, Sikkim',
    altitude: '2,085 m',
    founded: '1705',
    shortDescription: 'One of the oldest and premier monasteries',
    heroImage: '/monasteries/pemayangtse.jpg',
    gallery: [],
    sections: {
      overview: '',
      history: '',
      architecture: '',
      rituals: '',
      bestVisitTime: '',
      travelInfo: '',
      digitalArchive: '',
    },
    status: 'Draft',
    lastUpdated: '2024-12-03',
    createdAt: '2024-11-20',
  },
];

export default function MonasteriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter monasteries
  const filteredMonasteries = mockMonasteries.filter((monastery) => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || monastery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMonasteries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMonasteries = filteredMonasteries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center flex-1">
          <h1 className="text-5xl font-extrabold text-white mb-2" style={{ fontFamily: 'Poppins' }}>
            Monasteries
          </h1>
          <p className="text-xl font-bold text-amber-200" style={{ fontFamily: 'Poppins' }}>
            Manage all monastery listings
          </p>
        </div>
        <Link
          href="/admin/monasteries/new"
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-900 font-semibold transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          style={{ fontFamily: 'Poppins' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Monastery
        </Link>
      </div>

      {/* Filters Card */}
      <div
        className="rounded-2xl p-6 backdrop-blur-sm"
        style={{
          background: 'rgba(41, 24, 10, 0.8)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg bg-amber-950/60 border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none focus:border-amber-500/50 transition"
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

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['All', 'Published', 'Draft'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  statusFilter === status
                    ? 'bg-amber-500 text-amber-900'
                    : 'bg-amber-900/30 text-amber-100 hover:bg-amber-900/50'
                }`}
                style={{ fontFamily: 'Poppins' }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-amber-200" style={{ fontFamily: 'Poppins' }}>
          Showing {paginatedMonasteries.length} of {filteredMonasteries.length} monasteries
        </div>
      </div>

      {/* Table Card */}
      <div
        className="rounded-2xl overflow-hidden backdrop-blur-sm"
        style={{
          background: 'rgba(41, 24, 10, 0.8)',
          border: '1px solid rgba(217, 119, 6, 0.3)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-amber-800/30">
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Name
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Location
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Status
                </th>
                <th className="text-left px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Last Updated
                </th>
                <th className="text-right px-6 py-4 text-white font-semibold" style={{ fontFamily: 'Poppins' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedMonasteries.map((monastery) => (
                <tr
                  key={monastery.id}
                  className="border-b border-amber-800/20 hover:bg-amber-900/20 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${monastery.heroImage})` }}
                      />
                      <div>
                        <p className="text-white font-medium" style={{ fontFamily: 'Poppins' }}>
                          {monastery.name}
                        </p>
                        <p className="text-sm text-gray-400" style={{ fontFamily: 'Poppins' }}>
                          {monastery.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white" style={{ fontFamily: 'Poppins' }}>
                    {monastery.location}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={monastery.status} />
                  </td>
                  <td className="px-6 py-4 text-amber-200" style={{ fontFamily: 'Poppins' }}>
                    {new Date(monastery.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${monastery.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 transition"
                        title="View"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/monasteries/${monastery.id}`}
                        className="p-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 transition"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        className="p-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-400 transition"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-amber-800/30 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins' }}
            >
              Previous
            </button>
            <span className="text-amber-200" style={{ fontFamily: 'Poppins' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-100 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Poppins' }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
