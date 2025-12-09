import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the type for data contribution
interface DataContribution {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  organization: string;
  monastery: string;
  dataType: string;
  location: string;
  altitude: string;
  founded: string;
  description: string;
  historicalPeriod: string;
  language: string;
  sourceReference: string;
  overview: string;
  history: string;
  architecture: string;
  rituals: string;
  bestVisitTime: string;
  travelInfo: string;
  status: 'pending' | 'approved' | 'rejected';
}

const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'submissions', 'data-contributions.json');

// Ensure directory exists
async function ensureDirectoryExists() {
  try {
    await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Read all submissions
async function readSubmissions(): Promise<DataContribution[]> {
  try {
    await ensureDirectoryExists();
    const data = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Write submissions to file
async function writeSubmissions(submissions: DataContribution[]) {
  await ensureDirectoryExists();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

// POST: Create new data contribution submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'fullName',
      'email',
      'monastery',
      'dataType',
      'location',
      'altitude',
      'founded',
      'description',
    ];

    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Read existing submissions
    const submissions = await readSubmissions();

    // Create new submission
    const newSubmission: DataContribution = {
      id: `DATA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      organization: body.organization?.trim() || '',
      monastery: body.monastery.trim(),
      dataType: body.dataType.trim(),
      location: body.location.trim(),
      altitude: body.altitude.trim(),
      founded: body.founded.trim(),
      description: body.description.trim(),
      historicalPeriod: body.historicalPeriod || '',
      language: body.language || '',
      sourceReference: body.sourceReference || '',
      overview: body.overview || '',
      history: body.history || '',
      architecture: body.architecture || '',
      rituals: body.rituals || '',
      bestVisitTime: body.bestVisitTime || '',
      travelInfo: body.travelInfo || '',
      status: 'pending',
    };

    // Add to submissions
    submissions.push(newSubmission);

    // Write back to file
    await writeSubmissions(submissions);

    return NextResponse.json(
      { message: 'Data contribution submitted successfully', id: newSubmission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting data contribution:', error);
    return NextResponse.json(
      { error: 'Failed to submit data contribution' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all data contribution submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (optional - add your auth check here)
    const submissions = await readSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error retrieving data contributions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data contributions' },
      { status: 500 }
    );
  }
}
