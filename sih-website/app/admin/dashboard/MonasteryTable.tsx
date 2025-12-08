'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Monastery {
  id: string;
  slug: string;
  name: string;
  location: string;
  established: string;
  createdAt: string;
}

export default function MonasteryTable() {
  const router = useRouter();
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchMonasteries();
  }, []);

  async function fetchMonasteries() {
    try {
      const response = await fetch('/api/monasteries');
      
      if (!response.ok) {
        throw new Error('Failed to fetch monasteries');
      }

      const data = await response.json();
      setMonasteries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeleteId(slug);

    try {
      const response = await fetch(`/api/monasteries/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete monastery');
      }

      // Remove from list
      setMonasteries(monasteries.filter((m) => m.slug !== slug));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete monastery');
    } finally {
      setDeleteId(null);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading monasteries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (monasteries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No monasteries found.</p>
        <p className="text-gray-500 mt-2">Add your first monastery to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Established
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slug (ID)
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {monasteries.map((monastery) => (
            <tr key={monastery.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {monastery.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">
                  {monastery.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">
                  {monastery.established}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600 font-mono">
                  {monastery.slug}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => router.push(`/monasteries/${monastery.slug}`)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/admin/edit-monastery/${monastery.slug}`)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(monastery.slug, monastery.name)}
                    disabled={deleteId === monastery.slug}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteId === monastery.slug ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-sm text-gray-600">
        Total: {monasteries.length} {monasteries.length === 1 ? 'monastery' : 'monasteries'}
      </div>
    </div>
  );
}
