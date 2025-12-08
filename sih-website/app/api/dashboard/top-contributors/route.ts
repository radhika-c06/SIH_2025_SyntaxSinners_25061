/**
 * Dashboard Top Contributors API Route
 * GET /api/dashboard/top-contributors - Returns top contributors
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

export interface Contributor {
  id: string;
  name: string;
  email: string;
  submissions: number;
  approved: number;
  pendingReview: number;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const submissionCollection = mongoose.connection.collection('submissions');

    const contributors = await submissionCollection.aggregate([
      {
        $group: {
          _id: {
            name: '$contributorName',
            email: '$contributorEmail',
          },
          totalSubmissions: { $sum: 1 },
          approvedSubmissions: {
            $sum: {
              $cond: [{ $eq: ['$status', 'approved'] }, 1, 0],
            },
          },
          pendingSubmissions: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          email: '$_id.email',
          totalSubmissions: 1,
          approvedSubmissions: 1,
          pendingSubmissions: 1,
        },
      },
      {
        $sort: { totalSubmissions: -1 },
      },
      {
        $limit: 10,
      },
    ]).toArray();

    const data: Contributor[] = contributors.map((c: any, index: number) => ({
      id: `contrib-${index}`,
      name: c.name,
      email: c.email,
      submissions: c.totalSubmissions,
      approved: c.approvedSubmissions,
      pendingReview: c.pendingSubmissions,
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Top contributors error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contributors',
      },
      { status: 500 }
    );
  }
}
