/**
 * Monastery Template
 * Use this as a reference for creating new monastery entries
 */

export interface MonasteryTemplate {
  // Basic Information
  name: string;                    // Full name of the monastery (Required)
  slug: string;                    // URL-friendly identifier (auto-generated from name)
  location: string;                // City/Village, State (Required)
  district?: string;               // District name (Optional)
  altitude?: string;               // Elevation (e.g., "1,550 m")
  founded: string;                 // Year or date founded (Required)
  
  // Descriptions
  shortDescription: string;        // Brief one-line description (Required)
  
  // Media
  heroImageUrl: string;            // Main image URL/path (Required)
  gallery: string[];               // Array of image URLs for gallery
  
  // Content Sections
  sections: {
    overview?: string;             // General overview of the monastery
    history?: string;              // Historical background and significance
    architecture?: string;         // Architectural features and design
    rituals?: string;              // Religious practices and ceremonies
    bestVisitTime?: string;        // Recommended visiting seasons/times
    travelInfo?: string;           // How to reach, accommodation info
    digitalArchive?: string;       // Digital resources and archives
  };
  
  // Publication Status
  isPublished: boolean;            // true = live on website, false = draft
  
  // Additional Metadata (Optional)
  metadata?: {
    historicalPeriod?: string;     // Historical era/period
    sourceReferences?: string;     // Citations and references
    lastVerified?: string;         // Last verification date
    contributorInfo?: string;      // Contributor details
  };
}

// Empty Template - Copy and fill this out
export const EMPTY_MONASTERY_TEMPLATE: MonasteryTemplate = {
  name: '',
  slug: '',
  location: '',
  district: '',
  altitude: '',
  founded: '',
  shortDescription: '',
  heroImageUrl: '',
  gallery: [],
  sections: {
    overview: '',
    history: '',
    architecture: '',
    rituals: '',
    bestVisitTime: '',
    travelInfo: '',
    digitalArchive: '',
  },
  isPublished: false,
  metadata: {
    historicalPeriod: '',
    sourceReferences: '',
    lastVerified: '',
    contributorInfo: '',
  },
};

// Example Template - Pre-filled with sample data
export const EXAMPLE_MONASTERY_TEMPLATE: MonasteryTemplate = {
  name: 'Example Monastery',
  slug: 'example-monastery',
  location: 'Gangtok, Sikkim',
  district: 'East Sikkim',
  altitude: '1,700 m',
  founded: '1850',
  shortDescription: 'A historic Buddhist monastery known for its peaceful ambiance',
  heroImageUrl: '/monasteries/example-monastery.jpg',
  gallery: [
    '/monasteries/example-gallery-1.jpg',
    '/monasteries/example-gallery-2.jpg',
    '/monasteries/example-gallery-3.jpg',
  ],
  sections: {
    overview: 'Example Monastery is one of the prominent Buddhist centers in Sikkim...',
    history: 'Founded in 1850 by Lama Rinpoche, this monastery has a rich history...',
    architecture: 'The monastery features traditional Tibetan architecture with...',
    rituals: 'Daily prayers are held at dawn and dusk. Major festivals include...',
    bestVisitTime: 'The best time to visit is between October and March when...',
    travelInfo: 'Located 15 km from Gangtok. Accessible by taxi or local bus...',
    digitalArchive: 'View our collection of historical manuscripts and photographs...',
  },
  isPublished: false,
  metadata: {
    historicalPeriod: '19th Century',
    sourceReferences: 'Sikkim Gazetteer (1894), Monastery Archives',
    lastVerified: '2024-12-09',
    contributorInfo: 'Submitted by Local Heritage Committee',
  },
};

// Field Validation Rules
export const MONASTERY_FIELD_REQUIREMENTS = {
  required: [
    'name',
    'location',
    'founded',
    'shortDescription',
    'heroImageUrl',
  ],
  recommended: [
    'altitude',
    'district',
    'gallery',
    'sections.overview',
    'sections.history',
  ],
  optional: [
    'sections.architecture',
    'sections.rituals',
    'sections.bestVisitTime',
    'sections.travelInfo',
    'sections.digitalArchive',
    'metadata',
  ],
};

// Character Limits
export const MONASTERY_FIELD_LIMITS = {
  name: { min: 3, max: 100 },
  slug: { min: 3, max: 100 },
  location: { min: 3, max: 200 },
  shortDescription: { min: 10, max: 250 },
  sections: {
    overview: { min: 50, max: 5000 },
    history: { min: 50, max: 10000 },
    architecture: { min: 50, max: 5000 },
    rituals: { min: 50, max: 5000 },
    bestVisitTime: { min: 20, max: 1000 },
    travelInfo: { min: 20, max: 2000 },
  },
};
