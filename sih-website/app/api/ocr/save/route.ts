import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.location || !data.monasteryName || !data.cleanedText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create OCR data directory if it doesn't exist
    const ocrDataDir = join(process.cwd(), 'data', 'ocr');
    if (!existsSync(ocrDataDir)) {
      await mkdir(ocrDataDir, { recursive: true });
    }

    // Create filename from title and timestamp
    const timestamp = new Date().getTime();
    const filename = `${data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${timestamp}.json`;
    const filepath = join(ocrDataDir, filename);

    // Prepare data to save
    const ocrRecord = {
      id: timestamp,
      title: data.title,
      language: data.language,
      capturedOn: data.capturedOn,
      location: data.location,
      monasteryName: data.monasteryName,
      description: data.description || '',
      tags: data.tags || [],
      rawText: data.rawText,
      cleanedText: data.cleanedText,
      imageData: data.imageData,
      createdAt: new Date().toISOString(),
      status: 'pending', // For admin review
    };

    // Save to JSON file
    await writeFile(filepath, JSON.stringify(ocrRecord, null, 2), 'utf-8');

    // Save image separately if provided
    if (data.imageData) {
      const imagesDir = join(process.cwd(), 'data', 'ocr', 'images');
      if (!existsSync(imagesDir)) {
        await mkdir(imagesDir, { recursive: true });
      }

      const imageFilename = `${timestamp}.png`;
      const imagePath = join(imagesDir, imageFilename);
      
      // Extract base64 data and save
      const base64Data = data.imageData.replace(/^data:image\/\w+;base64,/, '');
      await writeFile(imagePath, base64Data, 'base64');
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'OCR data saved successfully',
        id: timestamp
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving OCR data:', error);
    return NextResponse.json(
      { error: 'Failed to save OCR data' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve OCR records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const ocrDataDir = join(process.cwd(), 'data', 'ocr');

    if (id) {
      // Get specific record
      const files = await require('fs').promises.readdir(ocrDataDir);
      const matchingFile = files.find((f: string) => f.includes(`_${id}.json`));
      
      if (!matchingFile) {
        return NextResponse.json(
          { error: 'Record not found' },
          { status: 404 }
        );
      }

      const filepath = join(ocrDataDir, matchingFile);
      const content = await require('fs').promises.readFile(filepath, 'utf-8');
      return NextResponse.json(JSON.parse(content));
    } else {
      // Get all records
      if (!existsSync(ocrDataDir)) {
        return NextResponse.json({ records: [] });
      }

      const files = await require('fs').promises.readdir(ocrDataDir);
      const jsonFiles = files.filter((f: string) => f.endsWith('.json'));
      
      const records = await Promise.all(
        jsonFiles.map(async (file: string) => {
          const filepath = join(ocrDataDir, file);
          const content = await require('fs').promises.readFile(filepath, 'utf-8');
          return JSON.parse(content);
        })
      );

      // Sort by creation date (newest first)
      records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return NextResponse.json({ records });
    }
  } catch (error) {
    console.error('Error retrieving OCR data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve OCR data' },
      { status: 500 }
    );
  }
}
