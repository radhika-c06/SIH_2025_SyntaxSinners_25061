/**
 * Dashboard Stats API Route
 * GET /api/dashboard/stats - Returns dashboard statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

interface StatsResponse {
  totalMonasteries: number;
  pendingSubmissions: number;
  publishedMonasteries: number;
  contributors: number;
  totalSubmissions: number;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get Monastery collection stats
    const monasteryCollection = mongoose.connection.collection('monasteries');
    const totalMonasteries = await monasteryCollection.countDocuments({});
    const publishedMonasteries = await monasteryCollection.countDocuments({ isPublished: true });

    // Get Submission collection stats
    const submissionCollection = mongoose.connection.collection('submissions');
    const totalSubmissions = await submissionCollection.countDocuments({});
    const pendingSubmissions = await submissionCollection.countDocuments({ status: 'pending' });

    // Get unique contributors
    const contributorData = await submissionCollection.aggregate([
      {
        $group: {
          _id: '$contributorEmail',
          name: { $first: '$contributorName' },
        },
      },
      {
        $count: 'total',
      },
    ]).toArray();

    const contributors = contributorData.length > 0 ? contributorData[0].total : 0;

    const stats: StatsResponse = {
      totalMonasteries,
      pendingSubmissions,
      publishedMonasteries,
      contributors,
      totalSubmissions,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
      },
      { status: 500 }
    );
  }
}
