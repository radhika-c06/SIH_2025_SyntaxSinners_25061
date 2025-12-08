/**
 * Dashboard Submissions Chart API Route
 * GET /api/dashboard/submissions-chart - Returns submission data for charts
 */

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import mongoose from 'mongoose';

export interface ChartData {
  month: string;
  approved: number;
  pending: number;
  rejected: number;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const submissionCollection = mongoose.connection.collection('submissions');

    // Get submissions from last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyData = await submissionCollection.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            status: '$status',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.month': 1 },
      },
    ]).toArray();

    // Transform data for chart
    const chartMap = new Map<string, { approved: number; pending: number; rejected: number }>();
    const months: string[] = [];

    // Initialize all months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toISOString().substring(0, 7);
      chartMap.set(monthStr, { approved: 0, pending: 0, rejected: 0 });
      months.push(monthStr);
    }

    // Fill in actual data
    monthlyData.forEach((item: any) => {
      const monthStr = item._id.month;
      const status = item._id.status || 'pending';
      const count = item.count;

      if (chartMap.has(monthStr)) {
        const data = chartMap.get(monthStr)!;
        if (status === 'approved') {
          data.approved = count;
        } else if (status === 'rejected') {
          data.rejected = count;
        } else {
          data.pending = count;
        }
      }
    });

    // Format for chart display
    const chartData: ChartData[] = months.map((month) => {
      const monthDate = new Date(month + '-01');
      const monthName = monthDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const data = chartMap.get(month) || { approved: 0, pending: 0, rejected: 0 };

      return {
        month: monthName,
        ...data,
      };
    });

    return NextResponse.json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    console.error('Dashboard chart error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch chart data',
      },
      { status: 500 }
    );
  }
}
