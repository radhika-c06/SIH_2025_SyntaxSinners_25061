'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MonasteryPageProps {
  params: {
    id: string;
  };
}

interface MonasteryData {
  id: string;
  slug: string;
  name: string;
  location: string;
  established: string;
  overview: string;
  imageUrl?: string;
  digitalArchive: {
    description: string;
    items: Array<{ title: string; type: string; description: string }>;
  };
  audioTour: {
    description: string;
    duration: string;
    audioFile: string;
  };
  culturalCalendar: {
    description: string;
    events: Array<{ name: string; date: string; description: string }>;
  };
  virtualTour: {
    description: string;
    videoFile: string;
    features: string[];
  };
}

export default function MonasteryPage({ params }: MonasteryPageProps) {
  const router = useRouter();
  const [monastery, setMonastery] = useState<MonasteryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMonastery() {
      try {
        const response = await fetch(`/api/monasteries/${params.id}`);
        
        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setMonastery(data);
      } catch (err) {
        console.error('Error fetching monastery:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMonastery();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading monastery...</p>
        </div>
      </div>
    );
  }

  if (error || !monastery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Monastery Not Found
          </h1>
          <p className="text-gray-600">
            The monastery you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  // Parse JSON fields
  const digitalArchive = monastery.digitalArchive;
  const audioTour = monastery.audioTour;
  const culturalCalendar = monastery.culturalCalendar;
  const virtualTour = monastery.virtualTour;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {monastery.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-lg text-gray-600">
            <span>📍 {monastery.location}</span>
            <span>🕉️ Established: {monastery.established}</span>
          </div>
        </header>

        {/* Image */}
        {monastery.imageUrl && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img
              src={monastery.imageUrl}
              alt={monastery.name}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Overview Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Overview
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {monastery.overview}
          </p>
        </section>

        {/* Digital Archive Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Digital Archive
          </h2>
          <p className="text-gray-700 mb-6">
            {digitalArchive.description}
          </p>
          <ul className="space-y-4">
            {digitalArchive.items.map((item, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.type}</p>
                <p className="text-gray-700">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Audio Tour Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Audio Tour
          </h2>
          <p className="text-gray-700 mb-4">
            {audioTour.description}
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Duration:</strong> {audioTour.duration}
            </li>
            <li>
              <strong>Audio File:</strong>{' '}
              <a
                href={audioTour.audioFile}
                className="text-blue-600 hover:underline"
              >
                Listen Now
              </a>
            </li>
          </ul>
        </section>

        {/* Cultural Calendar Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Cultural Calendar
          </h2>
          <p className="text-gray-700 mb-6">
            {culturalCalendar.description}
          </p>
          <ul className="space-y-6">
            {culturalCalendar.events.map((event, index) => (
              <li key={index} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {event.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Virtual Tour Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Virtual Tour
          </h2>
          <p className="text-gray-700 mb-4">
            {virtualTour.description}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {virtualTour.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <video
              src={virtualTour.videoFile}
              controls
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </div>
    </div>
  );
}
