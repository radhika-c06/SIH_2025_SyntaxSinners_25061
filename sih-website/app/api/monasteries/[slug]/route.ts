import { NextRequest, NextResponse } from 'next/server';
import { MonasteryService } from '@/lib/services/monastery.service';
import { UpdateMonasteryInput } from '@/lib/types/monastery';

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/monasteries/[slug] - Get monastery by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const monastery = await MonasteryService.getBySlug(params.slug);
    
    if (!monastery) {
      return NextResponse.json(
        { error: 'Monastery not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(monastery);
  } catch (error) {
    console.error('Error fetching monastery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monastery' },
      { status: 500 }
    );
  }
}

// PUT /api/monasteries/[slug] - Update monastery
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body: UpdateMonasteryInput = await request.json();
    
    const monastery = await MonasteryService.update(params.slug, body);
    return NextResponse.json(monastery);
  } catch (error) {
    console.error('Error updating monastery:', error);
    return NextResponse.json(
      { error: 'Failed to update monastery' },
      { status: 500 }
    );
  }
}

// DELETE /api/monasteries/[slug] - Delete monastery
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await MonasteryService.delete(params.slug);
    return NextResponse.json({ message: 'Monastery deleted successfully' });
  } catch (error) {
    console.error('Error deleting monastery:', error);
    return NextResponse.json(
      { error: 'Failed to delete monastery' },
      { status: 500 }
    );
  }
}
