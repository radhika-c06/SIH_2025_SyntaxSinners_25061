export interface Monastery {
  id: string;
  name: string;
  slug: string;
  location: string;
  altitude: string;
  founded: string;
  shortDescription: string;
  heroImage: string;
  gallery: string[];
  sections: {
    overview: string;
    history: string;
    architecture: string;
    rituals: string;
    bestVisitTime: string;
    travelInfo: string;
    digitalArchive: string;
  };
  status: 'Published' | 'Draft';
  lastUpdated: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  monasteryName: string;
  contributorName: string;
  contributorEmail: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedOn: string;
  rawContent: {
    basicInfo: {
      name: string;
      location: string;
      altitude?: string;
      founded?: string;
    };
    description: string;
    additionalNotes?: string;
  };
  reviewNotes?: string;
  linkedMonasteryId?: string;
}

export interface Contributor {
  id: string;
  name: string;
  email: string;
  totalSubmissions: number;
  approved: number;
  lastSubmissionDate: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: string;
}

// Dashboard API Response Types
export interface DashboardStats {
  totalMonasteries: number;
  pendingSubmissions: number;
  publishedMonasteries: number;
  contributors: number;
  totalSubmissions: number;
}

export interface DashboardActivity {
  id: string;
  action: string;
  user: string;
  target: string;
  timestamp: Date | string;
  type: 'submission' | 'monastery' | 'approval';
}

export interface DashboardChartData {
  month: string;
  approved: number;
  pending: number;
  rejected: number;
}

export interface DashboardContributor {
  id: string;
  name: string;
  email: string;
  submissions: number;
  approved: number;
  pendingReview: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
