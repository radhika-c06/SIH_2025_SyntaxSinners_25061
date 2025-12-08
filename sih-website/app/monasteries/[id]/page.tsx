interface PageProps {
  params: {
    id: string;
  };
}

async function getMonastery(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/monasteries/${slug}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching monastery:', error);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const monastery = await getMonastery(params.id);

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

  // Parse JSON fields
  const digitalArchive = monastery.digitalArchive as {
    description: string;
    items: Array<{ title: string; type: string; description: string }>;
  };
  const audioTour = monastery.audioTour as {
    description: string;
    duration: string;
    audioFile: string;
  };
  const culturalCalendar = monastery.culturalCalendar as {
    description: string;
    events: Array<{ name: string; date: string; description: string }>;
  };
  const virtualTour = monastery.virtualTour as {
    description: string;
    videoFile: string;
    features: string[];
  };

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
