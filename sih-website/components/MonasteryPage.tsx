'use client';

import { monasteries, Monastery } from '../data/monasteriesData';

interface MonasteryPageProps {
  id: string;
}

export default function MonasteryPage({ id }: MonasteryPageProps) {
  const monastery: Monastery | undefined = monasteries.find(
    (m) => m.id === id
  );

  if (!monastery) {
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
            {monastery.digitalArchive.description}
          </p>
          <ul className="space-y-4">
            {monastery.digitalArchive.items.map((item, index) => (
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
            {monastery.audioTour.description}
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Duration:</strong> {monastery.audioTour.duration}
            </li>
            <li>
              <strong>Audio File:</strong>{' '}
              <a
                href={monastery.audioTour.audioFile}
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
            {monastery.culturalCalendar.description}
          </p>
          <ul className="space-y-6">
            {monastery.culturalCalendar.events.map((event, index) => (
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
            {monastery.virtualTour.description}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            {monastery.virtualTour.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <video
              src={monastery.virtualTour.videoFile}
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
