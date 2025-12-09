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
      <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-amber-100 text-xl" style={{ fontFamily: 'Poppins' }}>
            Loading monastery details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !monastery) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-amber-100 text-xl mb-4" style={{ fontFamily: 'Poppins' }}>
            {error || 'Monastery not found'}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition"
            style={{ fontFamily: 'Poppins' }}
          >
            Go Back
          </button>
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
