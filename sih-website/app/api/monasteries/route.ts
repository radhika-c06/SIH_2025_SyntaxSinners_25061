import { NextRequest, NextResponse } from 'next/server';
import { MonasteryService } from '@/lib/services/monastery.service';
import { CreateMonasteryInput } from '@/lib/types/monastery';

// GET /api/monasteries - Get all monasteries
export async function GET() {
  try {
    const monasteries = await MonasteryService.getAll();
    return NextResponse.json(monasteries);
  } catch (error) {
    console.error('Error fetching monasteries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monasteries' },
      { status: 500 }
    );
  }
}

// POST /api/monasteries - Create new monastery
export async function POST(request: NextRequest) {
  try {
    const body: CreateMonasteryInput = await request.json();

    // Validate required fields
    if (!body.slug || !body.name || !body.location || !body.established) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const exists = await MonasteryService.slugExists(body.slug);
    if (exists) {
      return NextResponse.json(
        { error: 'Monastery with this slug already exists' },
        { status: 409 }
      );
    }

    const monastery = await MonasteryService.create(body);
    return NextResponse.json(monastery, { status: 201 });
  } catch (error) {
    console.error('Error creating monastery:', error);
    return NextResponse.json(
      { error: 'Failed to create monastery' },
      { status: 500 }
    );
  }
}
