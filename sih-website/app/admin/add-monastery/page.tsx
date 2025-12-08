'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { monasterySchema, MonasteryFormData } from '@/lib/validations/monastery';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

async function handleLogout(router: any) {
  await fetch('/api/auth/logout', { method: 'POST' });
  router.push('/admin/login');
}

export default function AddMonasteryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MonasteryFormData>({
    resolver: zodResolver(monasterySchema),
    defaultValues: {
      digitalArchive: { description: '', items: [{ title: '', type: '', description: '' }] },
      audioTour: { description: '', duration: '', audioFile: '' },
      culturalCalendar: { description: '', events: [{ name: '', date: '', description: '' }] },
      virtualTour: { description: '', videoFile: '', features: [''] },
    },
  });

  const { fields: archiveItems, append: appendArchive, remove: removeArchive } = useFieldArray({
    control,
    name: 'digitalArchive.items',
  });

  const { fields: events, append: appendEvent, remove: removeEvent } = useFieldArray({
    control,
    name: 'culturalCalendar.events',
  });

  // Handle features array manually since it's just strings
  const [features, setFeatures] = useState<string[]>(['']);

  const onSubmit = async (data: MonasteryFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Add features to the data
      const submitData = {
        ...data,
        virtualTour: {
          ...data.virtualTour,
          features: features.filter(f => f.trim() !== ''),
        },
      };

      const response = await fetch('/api/monasteries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create monastery');
      }

      setMessage({ type: 'success', text: 'Monastery created successfully!' });
      setTimeout(() => {
        router.push(`/monasteries/${data.slug}`);
      }, 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Monastery</h1>
            <button
              onClick={() => handleLogout(router)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                  <input
                    {...register('slug')}
                    type="text"
                    placeholder="dubdi-monastery"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Dubdi Monastery"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    {...register('location')}
                    type="text"
                    placeholder="Yuksom, West Sikkim"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                  <input
                    {...register('established')}
                    type="text"
                    placeholder="1701 CE"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.established && <p className="mt-1 text-sm text-red-600">{errors.established.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                  <input
                    {...register('imageUrl')}
                    type="text"
                    placeholder="/dubdi/main.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                  <textarea
                    {...register('overview')}
                    rows={4}
                    placeholder="Brief overview of the monastery..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.overview && <p className="mt-1 text-sm text-red-600">{errors.overview.message}</p>}
                </div>
              </div>
            </section>

            {/* Digital Archive */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Digital Archive</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    {...register('digitalArchive.description')}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.digitalArchive?.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.digitalArchive.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Archive Items</label>
                  {archiveItems.map((field: any, index: number) => (
                    <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="space-y-3">
                        <input
                          {...register(`digitalArchive.items.${index}.title`)}
                          placeholder="Item Title"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          {...register(`digitalArchive.items.${index}.type`)}
                          placeholder="Type (Document/Artifact/Artwork)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                          {...register(`digitalArchive.items.${index}.description`)}
                          placeholder="Description"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeArchive(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendArchive({ title: '', type: '', description: '' })}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Archive Item
                  </button>
                </div>
              </div>
            </section>

            {/* Audio Tour */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Audio Tour</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    {...register('audioTour.description')}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.audioTour?.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.audioTour.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (MM:SS)</label>
                  <input
                    {...register('audioTour.duration')}
                    type="text"
                    placeholder="15:30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.audioTour?.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.audioTour.duration.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio File Path</label>
                  <input
                    {...register('audioTour.audioFile')}
                    type="text"
                    placeholder="/dubdi/audio.mp3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.audioTour?.audioFile && (
                    <p className="mt-1 text-sm text-red-600">{errors.audioTour.audioFile.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Cultural Calendar */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cultural Calendar</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    {...register('culturalCalendar.description')}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.culturalCalendar?.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.culturalCalendar.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Events</label>
                  {events.map((field: any, index: number) => (
                    <div key={field.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="space-y-3">
                        <input
                          {...register(`culturalCalendar.events.${index}.name`)}
                          placeholder="Event Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          {...register(`culturalCalendar.events.${index}.date`)}
                          placeholder="Date (e.g., February-March)"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                          {...register(`culturalCalendar.events.${index}.description`)}
                          placeholder="Description"
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeEvent(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Event
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendEvent({ name: '', date: '', description: '' })}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Event
                  </button>
                </div>
              </div>
            </section>

            {/* Virtual Tour */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Virtual Tour</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    {...register('virtualTour.description')}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.virtualTour?.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.virtualTour.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video File Path</label>
                  <input
                    {...register('virtualTour.videoFile')}
                    type="text"
                    placeholder="/dubdi/virtual-tour.mp4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.virtualTour?.videoFile && (
                    <p className="mt-1 text-sm text-red-600">{errors.virtualTour.videoFile.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...features];
                          newFeatures[index] = e.target.value;
                          setFeatures(newFeatures);
                        }}
                        placeholder="Feature description"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFeatures([...features, ''])}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create Monastery'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
