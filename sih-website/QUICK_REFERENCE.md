# Quick Reference: Published Monastery System

## For Admins

### 📝 Create & Publish a Monastery

**Step 1: Open Admin Dashboard**
```
Navigate to: /admin/monasteries/new
```

**Step 2: Fill Basic Information**
- Monastery Name *
- Location * (e.g., "Sikkim, India")
- Altitude (e.g., "1600 meters")
- Founded (e.g., "1960")
- Short Description *

**Step 3: Add Images**
- Hero Image URL (main image)
- Gallery Images (multiple image URLs)

**Step 4: Add Content Sections**
Fill in any/all of these sections:
- Overview
- History
- Architecture
- Rituals
- Best Visit Time
- Travel Info
- Digital Archive

**Step 5: Publish**
- Click "Save as Published"
- System verifies information
- If approved → Published immediately!

**Step 6: Share**
- Get the link: `/all-monasteries/[auto-generated-slug]`
- Example: `/all-monasteries/rumtek-monastery`

---

## For Users/Visitors

### 🏛️ View Published Monasteries

**Access any published monastery:**
```
https://yoursite.com/all-monasteries/[monastery-name]
```

**Examples:**
- `/all-monasteries/rumtek-monastery`
- `/all-monasteries/tashiding-monastery`
- `/all-monasteries/dubdi-monastery`
- `/all-monasteries/tsuk-monastery`

**What You'll See:**
- Beautiful hero image with carousel
- Location and founding year info
- Complete monastery information sections
- Digital archive (if available)
- Navigation to different sections
- Gallery of monastery images

---

## For Developers

### 🔧 Use MonasteryTemplate Component

**Basic Usage:**
```tsx
import MonasteryTemplate from '@/components/MonasteryTemplate';

// With no props (empty template)
<MonasteryTemplate />

// With data
<MonasteryTemplate
  name="Rumtek Monastery"
  location="Sikkim, India"
  altitude="1600 meters"
  founded="1960"
  shortDescription="A renowned Buddhist monastery..."
  heroImageUrl="/rumtek/hero.jpg"
  gallery={["/rumtek/img1.jpg", "/rumtek/img2.jpg"]}
  sections={[
    {
      key: 'overview',
      title: 'Overview',
      content: 'Lorem ipsum dolor sit amet...'
    },
    {
      key: 'history',
      title: 'History',
      content: 'Founded in 1960...'
    }
  ]}
  archiveItems={[]}
/>
```

### 🔌 API Endpoints

**Create Monastery (Admin Only)**
```
POST /api/monasteries
Content-Type: application/json
Authorization: Admin Token

{
  "name": "Rumtek Monastery",
  "location": "Sikkim, India",
  "altitude": "1600 meters",
  "founded": "1960",
  "shortDescription": "Description...",
  "heroImageUrl": "/path/to/image.jpg",
  "gallery": ["/img1.jpg", "/img2.jpg"],
  "sections": [
    {
      "key": "overview",
      "title": "Overview",
      "content": "Content..."
    }
  ],
  "isPublished": true  // Set to true to publish immediately
}
```

**Fetch Monastery by Slug**
```
GET /api/monasteries/rumtek-monastery

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Rumtek Monastery",
    "slug": "rumtek-monastery",
    "location": "Sikkim, India",
    ...all other fields...
  }
}
```

**List Published Monasteries**
```
GET /api/monasteries?admin=false&page=1&limit=10

Response:
{
  "success": true,
  "data": {
    "monasteries": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "pages": 5
    }
  }
}
```

### 📂 File Structure Reference

```
Key Files for Published Monasteries:

components/
└── MonasteryTemplate.tsx        ← Reusable component

app/
├── all-monasteries/
│   └── [slug]/
│       └── page.tsx             ← Dynamic route handler
│
└── api/
    └── monasteries/
        ├── route.ts             ← POST (create), GET (list)
        └── [id]/route.ts        ← GET (by ID or slug)

lib/
└── models/
    └── Monastery.ts             ← MongoDB schema
```

---

## Status & Visibility

### Draft Status
- `isPublished: false`
- Only visible to authenticated admins
- URL: `/api/monasteries?admin=true`
- Not public

### Published Status
- `isPublished: true`
- Visible to everyone
- Accessible at: `/all-monasteries/[slug]`
- Listed in public API: `/api/monasteries`

---

## Common Tasks

### ✏️ Edit a Published Monastery
1. Go to `/admin/monasteries`
2. Find the monastery
3. Click edit
4. Update information
5. Save changes

### 🗑️ Remove from Public
1. Go to `/admin/monasteries`
2. Find the monastery
3. Set status to Draft
4. Save
5. Will no longer appear at `/all-monasteries/[slug]`

### 🔍 Check if Published
Visit the URL in browser:
- If it shows the monastery page → Published ✅
- If it shows "not found" → Not published ❌

### 📊 Get List of All Published
API call:
```
GET /api/monasteries

Returns only published monasteries with pagination
```

---

## Troubleshooting Quick Fix

**Monastery not showing:**
- Check if `isPublished` is `true`
- Verify slug is correct (check database)
- Check MongoDB connection

**Images not loading:**
- Verify image URLs are absolute (start with http/https)
- Check if images are accessible
- Check CORS settings if external images

**Sections not rendering:**
- Check if sections array has proper format
- Verify each section has: key, title, content
- Check browser console for errors

**API returning empty:**
- Add `?admin=false` to only get published monasteries
- Check pagination parameters

---

## Access Control

| Feature | Public | Admin |
|---------|--------|-------|
| View published monastery | ✅ | ✅ |
| List published monasteries | ✅ | ✅ |
| Create monastery | ❌ | ✅ |
| Edit monastery | ❌ | ✅ |
| Publish monastery | ❌ | ✅ |
| Delete monastery | ❌ | ✅ |
| View draft monasteries | ❌ | ✅ |

---

## Response Examples

### Successful Monastery Fetch
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rumtek Monastery",
    "slug": "rumtek-monastery",
    "location": "Sikkim, India",
    "altitude": "1600 meters",
    "founded": "1960",
    "shortDescription": "One of the most important...",
    "heroImageUrl": "/rumtek/hero.jpg",
    "gallery": ["/rumtek/1.jpg", "/rumtek/2.jpg"],
    "sections": [
      {
        "key": "overview",
        "title": "Overview",
        "content": "Rumtek Monastery is..."
      }
    ],
    "isPublished": true,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Not Found Error
```json
{
  "success": false,
  "error": "Monastery not found"
}
```

---

## Performance Notes

- 🚀 Dynamic routes are cached for performance
- 🔄 Each monastery load fetches fresh data from DB
- 📦 Sections are stored together - no N+1 queries
- 🖼️ Images are served as URLs - optimize on your image hosting
- 🌍 Use CDN for images for better performance

---

## Version Info

- Created: December 2024
- Component: React/Next.js
- Database: MongoDB
- Template: TailwindCSS Styled
- Dynamic Routes: Next.js App Router
