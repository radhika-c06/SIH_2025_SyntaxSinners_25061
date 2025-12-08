// Type for creating a new monastery
export interface CreateMonasteryInput {
  slug: string;
  name: string;
  location: string;
  established: string;
  overview: string;
  imageUrl?: string;
  digitalArchive: {
    description: string;
    items: Array<{
      title: string;
      type: string;
      description: string;
    }>;
  };
  audioTour: {
    description: string;
    duration: string;
    audioFile: string;
  };
  culturalCalendar: {
    description: string;
    events: Array<{
      name: string;
      date: string;
      description: string;
    }>;
  };
  virtualTour: {
    description: string;
    videoFile: string;
    features: string[];
  };
}

// Type for updating a monastery
export type UpdateMonasteryInput = Partial<CreateMonasteryInput>;

// Type-safe JSON parsing helpers
export type MonasteryDigitalArchive = {
  description: string;
  items: Array<{
    title: string;
    type: string;
    description: string;
  }>;
};

export type MonasteryAudioTour = {
  description: string;
  duration: string;
  audioFile: string;
};

export type MonasteryCulturalCalendar = {
  description: string;
  events: Array<{
    name: string;
    date: string;
    description: string;
  }>;
};

export type MonasteryVirtualTour = {
  description: string;
  videoFile: string;
  features: string[];
};
