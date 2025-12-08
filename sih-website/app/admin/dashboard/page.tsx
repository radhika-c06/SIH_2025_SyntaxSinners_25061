import { Suspense } from 'react';
import Link from 'next/link';
import MonasteryTable from './MonasteryTable';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function handleLogout() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
  redirect('/admin/login');
}

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your monastery listings
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin/add-monastery"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                + Add Monastery
              </Link>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          {/* Monastery Table */}
          <Suspense fallback={<LoadingSkeleton />}>
            <MonasteryTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
