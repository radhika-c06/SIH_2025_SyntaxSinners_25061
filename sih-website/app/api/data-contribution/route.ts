import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContributorSubmission } from '@/lib/models/ContributorSubmission';

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

// POST: Create new data contribution submission
export async function POST(request: NextRequest) {
  try {
    await connectDB();
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

    // Create new submission in MongoDB
    const newSubmission = new ContributorSubmission({
      monasteryName: body.monastery.trim(),
      location: body.location.trim(),
      contributorName: body.fullName.trim(),
      contributorEmail: body.email.trim(),
      rawContent: {
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
      },
      status: 'pending',
    });

    await newSubmission.save();

    return NextResponse.json(
      { 
        message: 'Data contribution submitted successfully', 
        id: newSubmission._id 
      },
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
    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Build query
    let query: any = {};
    if (status && status !== 'All') {
      query.status = status.toLowerCase();
    }

    // Fetch submissions
    const submissions = await ContributorSubmission.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Format response to match what admin dashboard expects
    const formatted = submissions.map((doc: any) => ({
      id: doc._id,
      monasteryName: doc.monasteryName,
      contributorName: doc.contributorName,
      contributorEmail: doc.contributorEmail,
      status: doc.status,
      timestamp: doc.createdAt,
      dataType: doc.rawContent?.dataType || 'Data Contribution',
      ...doc.rawContent,
      _id: doc._id,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error retrieving data contributions:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data contributions' },
      { status: 500 }
    );
  }
}
