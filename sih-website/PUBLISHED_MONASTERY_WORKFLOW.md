# Published Monastery Workflow Guide

## Overview
This system allows admins to create and publish monasteries through the admin dashboard. Published monasteries are automatically available as individual pages and use the shared MonasteryTemplate component.

## How It Works

### 1. **Admin Creates a Monastery**
- Admin navigates to `/admin/monasteries/new`
- Fills in monastery details:
  - **Basic Information**: Name, Location, Altitude, Founded year
  - **Description**: Short description for the monastery
  - **Hero Image**: Main image for the monastery page
  - **Gallery**: Multiple images for the gallery
  - **Sections**: Content sections (Overview, History, Architecture, Rituals, etc.)

### 2. **AI Verification**
- Before saving, the monastery information is verified using the AI verification API (`/api/verify-monastery`)
- The system checks if the information is accurate and reasonable
- Admin can only publish if verification is approved

### 3. **Publishing Status**
- **Draft**: Monastery is saved but not visible to public
- **Published**: Monastery is saved and immediately available at `/all-monasteries/[slug]`

### 4. **Data Storage**
- Monastery data is stored in MongoDB with the following fields:
  - `name`: Monastery name
  - `slug`: URL-friendly identifier (auto-generated)
  - `location`: Geographic location
  - `altitude`: Altitude in meters
  - `founded`: Year/date founded
  - `shortDescription`: Brief description
  - `heroImageUrl`: Main image URL
  - `gallery`: Array of image URLs
  - `sections`: Array of content sections with key, title, and content
  - `isPublished`: Boolean flag (true for published, false for draft)

### 5. **Public Access**
- Published monasteries are automatically available at: `/all-monasteries/[slug]`
- The page uses the shared `MonasteryTemplate` component
- The `[slug]` dynamic route fetches data from the database
- All content is rendered from the stored data

## File Structure

```
app/
├── all-monasteries/
│   ├── [slug]/                    # Dynamic route for published monasteries
│   │   └── page.tsx               # Fetches monastery by slug and renders
│   ├── rumtek/                    # Static monastery pages (legacy)
│   ├── tashiding/
│   ├── dubdi/
│   └── tsuk/
│
├── admin/
│   └── monasteries/
│       └── new/
│           └── page.tsx           # Add new monastery form
│
├── api/
│   └── monasteries/
│       ├── route.ts               # GET (list) & POST (create) monasteries
│       └── [id]/route.ts          # GET by ID/slug, PATCH, DELETE
│
components/
└── MonasteryTemplate.tsx          # Reusable template for monastery pages
                                  # Now accepts props for dynamic data

lib/
└── models/
    └── Monastery.ts              # MongoDB Monastery schema
```

## Component: MonasteryTemplate

### Props Accepted
```typescript
interface MonasteryTemplateProps {
  name?: string;                   // Monastery name
  location?: string;               // Geographic location
  altitude?: string;               // Altitude in meters
  founded?: string;                // Year/date founded
  shortDescription?: string;       // Brief description
  heroImageUrl?: string;           // Main image URL
  gallery?: string[];              // Array of image URLs
  sections?: ISection[];           // Content sections
  archiveItems?: any[];            // Digital archive items
}
```

### Usage Example
```tsx
<MonasteryTemplate
  name="Rumtek Monastery"
  location="Sikkim, India"
  altitude="1,600"
  founded="1960"
  shortDescription="A renowned Buddhist monastery..."
  heroImageUrl="/path/to/hero.jpg"
  gallery={["/path/to/img1.jpg", "/path/to/img2.jpg"]}
  sections={[
    { key: 'overview', title: 'Overview', content: '...' },
    { key: 'history', title: 'History', content: '...' },
  ]}
/>
```

## API Endpoints

### Create/List Monasteries
- **POST** `/api/monasteries` - Create new monastery (admin only)
  - Request body includes: name, location, altitude, founded, sections, isPublished
  - Returns: Created monastery object with ID and slug

### Get Monastery
- **GET** `/api/monasteries/[id]` - Get by MongoDB ID or slug
  - Returns: Full monastery object with all data
  
### Get Published Monasteries List
- **GET** `/api/monasteries?admin=false` - Get only published monasteries
  - Returns: Paginated list of published monasteries

## Data Flow

```
Admin Form Input
    ↓
AI Verification
    ↓
POST /api/monasteries (with isPublished flag)
    ↓
MongoDB Save (Monastery collection)
    ↓
[For Published Monasteries]
    ↓
User visits /all-monasteries/[slug]
    ↓
[slug] Page Component
    ↓
GET /api/monasteries/[slug]
    ↓
MonasteryTemplate receives data via props
    ↓
Renders with all provided data
```

## Adding New Content Sections

To add new sections to a monastery:

1. In the admin form, fill the corresponding section in the "Sections" tab
2. Sections are stored as an array of objects with `key`, `title`, and `content`
3. In MonasteryTemplate, sections are dynamically rendered based on their keys
4. Example keys: `overview`, `history`, `architecture`, `rituals`, `bestVisitTime`, `travelInfo`, `digitalArchive`

## Legacy Pages (rumtek, tashiding, dubdi, tsuk)

The static pages still exist at their original routes for backward compatibility. However, new monasteries should use the dynamic `[slug]` route approach.

To migrate a static monastery to the dynamic system:
1. Create monastery through admin form with published status
2. The database record can be accessed via `/all-monasteries/[slug]`
3. Static pages can be kept for legacy links

## Publishing a Monastery: Step-by-Step

1. Go to `/admin/dashboard`
2. Click "+ Add New Monastery"
3. Fill in all basic information (Name, Location, etc.)
4. Upload/provide hero image URL
5. Add gallery images (optional)
6. Fill in content sections
7. Click "Save as Published"
8. System verifies information with AI
9. If approved, monastery is saved and immediately live
10. Access at: `/all-monasteries/[slug]` (e.g., `/all-monasteries/rumtek-monastery`)

## Environment Variables Required

Ensure these are set in your `.env.local`:
- `MONGODB_URI` - MongoDB connection string
- `AI_VERIFICATION_API` - URL for monastery verification API
- `NEXT_PUBLIC_API_URL` - Frontend API URL

## Troubleshooting

### Monastery not appearing after publishing
- Check if `isPublished` field is `true` in database
- Verify slug is unique
- Check MongoDB connection

### Template not rendering data
- Verify all props are being passed from the dynamic route
- Check browser console for errors
- Ensure sections array is properly formatted

### Images not loading
- Verify image URLs are correct and accessible
- Check CORS settings if images are from external sources
- Ensure image URLs are absolute (not relative)
