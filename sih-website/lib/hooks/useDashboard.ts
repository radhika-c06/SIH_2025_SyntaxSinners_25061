/**
 * Custom hook for fetching dashboard data
 */

import { useState, useEffect } from 'react';

export interface StatsData {
  totalMonasteries: number;
  pendingSubmissions: number;
  publishedMonasteries: number;
  contributors: number;
  totalSubmissions: number;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: Date | string;
  type: 'submission' | 'monastery' | 'approval';
}

export interface ChartData {
  month: string;
  approved: number;
  pending: number;
  rejected: number;
}

export interface Contributor {
  id: string;
  name: string;
  email: string;
  submissions: number;
  approved: number;
  pendingReview: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useDashboardActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/activity');
        if (!res.ok) throw new Error('Failed to fetch activity');
        const data = await res.json();
        if (data.success) {
          setActivities(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching dashboard activity:', err);
        setError(err instanceof Error ? err.message : 'Failed to load activity');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return { activities, loading, error };
}

export function useDashboardChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/submissions-chart');
        if (!res.ok) throw new Error('Failed to fetch chart data');
        const data = await res.json();
        if (data.success) {
          setChartData(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  return { chartData, loading, error };
}

export function useDashboardContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/top-contributors');
        if (!res.ok) throw new Error('Failed to fetch contributors');
        const data = await res.json();
        if (data.success) {
          setContributors(data.data);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        console.error('Error fetching contributors:', err);
        setError(err instanceof Error ? err.message : 'Failed to load contributors');
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  return { contributors, loading, error };
}
