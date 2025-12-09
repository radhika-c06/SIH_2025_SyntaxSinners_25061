'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MonasteryTemplate from '@/components/MonasteryTemplate';
import { useRouter } from 'next/navigation';

interface ISection {
  key: string;
  title: string;
  content: string;
}

interface Monastery {
  _id: string;
  name: string;
  slug: string;
  location: string;
  altitude?: string;
  founded: string;
  shortDescription: string;
  heroImageUrl: string;
  gallery: string[];
  sections: ISection[];
  isPublished: boolean;
}

export default function MonasteryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [monastery, setMonastery] = useState<Monastery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonastery = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/monasteries/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Monastery not found');
            return;
          }
          throw new Error('Failed to fetch monastery');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setMonastery(data.data);
        } else {
          setError('Monastery not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load monastery');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMonastery();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
          <p className="mt-4 text-amber-900">Loading monastery...</p>
        </div>
      </div>
    );
  }

  if (error || !monastery) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Monastery Not Found
          </h1>
          <p className="text-amber-700 mb-6">
            {error || 'The monastery you are looking for does not exist.'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <MonasteryTemplate
      name={monastery.name}
      location={monastery.location}
      altitude={monastery.altitude}
      founded={monastery.founded}
      shortDescription={monastery.shortDescription}
      heroImageUrl={monastery.heroImageUrl}
      gallery={monastery.gallery}
      sections={monastery.sections}
      archiveItems={[]}
    />
  );
}
