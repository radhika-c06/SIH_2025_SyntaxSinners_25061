import { prisma } from '@/lib/prisma';
import { CreateMonasteryInput, UpdateMonasteryInput } from '@/lib/types/monastery';

export class MonasteryService {
  // Get all monasteries
  static async getAll() {
    return await prisma.monastery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get monastery by slug
  static async getBySlug(slug: string) {
    return await prisma.monastery.findUnique({
      where: { slug },
    });
  }

  // Get monastery by ID
  static async getById(id: string) {
    return await prisma.monastery.findUnique({
      where: { id },
    });
  }

  // Create new monastery
  static async create(data: CreateMonasteryInput) {
    return await prisma.monastery.create({
      data: {
        slug: data.slug,
        name: data.name,
        location: data.location,
        established: data.established,
        overview: data.overview,
        imageUrl: data.imageUrl,
        digitalArchive: data.digitalArchive as any,
        audioTour: data.audioTour as any,
        culturalCalendar: data.culturalCalendar as any,
        virtualTour: data.virtualTour as any,
      },
    });
  }

  // Update monastery
  static async update(slug: string, data: UpdateMonasteryInput) {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.location) updateData.location = data.location;
    if (data.established) updateData.established = data.established;
    if (data.overview) updateData.overview = data.overview;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.digitalArchive) updateData.digitalArchive = data.digitalArchive;
    if (data.audioTour) updateData.audioTour = data.audioTour;
    if (data.culturalCalendar) updateData.culturalCalendar = data.culturalCalendar;
    if (data.virtualTour) updateData.virtualTour = data.virtualTour;

    return await prisma.monastery.update({
      where: { slug },
      data: updateData,
    });
  }

  // Delete monastery
  static async delete(slug: string) {
    return await prisma.monastery.delete({
      where: { slug },
    });
  }

  // Check if slug exists
  static async slugExists(slug: string): Promise<boolean> {
    const monastery = await prisma.monastery.findUnique({
      where: { slug },
      select: { id: true },
    });
    return !!monastery;
  }
}
