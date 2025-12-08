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
