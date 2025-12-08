import { z } from 'zod';

// Validation schema for monastery form
export const monasterySchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  established: z.string().min(1, 'Established year is required'),
  overview: z.string().min(10, 'Overview must be at least 10 characters'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  digitalArchive: z.object({
    description: z.string().min(1, 'Description is required'),
    items: z.array(
      z.object({
        title: z.string().min(1, 'Title is required'),
        type: z.string().min(1, 'Type is required'),
        description: z.string().min(1, 'Description is required'),
      })
    ),
  }),
  audioTour: z.object({
    description: z.string().min(1, 'Description is required'),
    duration: z.string().regex(/^\d{1,2}:\d{2}$/, 'Duration must be in MM:SS format'),
    audioFile: z.string().min(1, 'Audio file path is required'),
  }),
  culturalCalendar: z.object({
    description: z.string().min(1, 'Description is required'),
    events: z.array(
      z.object({
        name: z.string().min(1, 'Event name is required'),
        date: z.string().min(1, 'Date is required'),
        description: z.string().min(1, 'Description is required'),
      })
    ),
  }),
  virtualTour: z.object({
    description: z.string().min(1, 'Description is required'),
    videoFile: z.string().min(1, 'Video file path is required'),
    features: z.array(z.string().min(1, 'Feature cannot be empty')),
  }),
});

export type MonasteryFormData = z.infer<typeof monasterySchema>;
