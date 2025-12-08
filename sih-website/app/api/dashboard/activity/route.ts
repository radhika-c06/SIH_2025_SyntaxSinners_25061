/**
 * Dashboard Activity API Route
 * GET /api/dashboard/activity - Returns recent activity
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

export interface Activity {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: Date;
  type: 'submission' | 'monastery' | 'approval';
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const limit = 10;
    const activity: Activity[] = [];

    // Get recent submissions
    const submissionCollection = mongoose.connection.collection('submissions');
    const recentSubmissions = await submissionCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    recentSubmissions.forEach((sub: any) => {
      activity.push({
        id: sub._id.toString(),
        action: sub.status === 'approved' ? 'approved' : 'submitted',
        user: sub.contributorName,
        target: sub.monasteryName,
        timestamp: sub.updatedAt || sub.createdAt,
        type: 'submission',
      });
    });

    // Get recent monasteries
    const monasteryCollection = mongoose.connection.collection('monasteries');
    const recentMonasteries = await monasteryCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    recentMonasteries.forEach((mon: any) => {
      activity.push({
        id: mon._id.toString(),
        action: mon.isPublished ? 'published' : 'updated',
        user: 'System',
        target: mon.name,
        timestamp: mon.updatedAt || mon.createdAt,
        type: 'monastery',
      });
    });

    // Sort by timestamp and limit to the most recent items
    const sortedActivity = activity
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: sortedActivity,
    });
  } catch (error) {
    console.error('Dashboard activity error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch activity',
      },
      { status: 500 }
    );
  }
}
