# Monastery Template Guide

## Overview
This guide explains how to add new monasteries to the dashboard using the provided templates.

## Quick Start

### Using the Admin Dashboard (Recommended)
1. Navigate to `/admin/monasteries`
2. Click "Add Monastery" button
3. Fill in the form fields
4. Click "Save as Draft" to save without publishing
5. Click "Publish" when ready to make it live

### Using the Template Files

#### JSON Template
Location: `data/monastery-template.json`

Copy this file and fill in all the empty fields with monastery information:

```json
{
  "name": "Your Monastery Name",
  "slug": "your-monastery-name",
  "location": "City, State",
  ...
}
```

#### TypeScript Template
Location: `types/monastery-template.ts`

Use the `EMPTY_MONASTERY_TEMPLATE` constant as a reference in your code:

```typescript
import { EMPTY_MONASTERY_TEMPLATE } from '@/types/monastery-template';

const newMonastery = {
  ...EMPTY_MONASTERY_TEMPLATE,
  name: 'Your Monastery Name',
  location: 'City, State',
  // ... fill other fields
};
```

## Field Descriptions

### Required Fields ⚠️

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Full monastery name | "Rumtek Monastery" |
| `location` | string | City/village and state | "Rumtek, Sikkim" |
| `founded` | string | Year or date founded | "1960" |
| `shortDescription` | string | One-line description (10-250 chars) | "The largest monastery in Sikkim" |
| `heroImageUrl` | string | Path to main image | "/rumtek/rumtek1.avif" |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `slug` | string | URL identifier (auto-generated) | "rumtek-monastery" |
| `district` | string | District name | "East Sikkim" |
| `altitude` | string | Elevation | "1,550 m" |
| `gallery` | array | Additional images | ["/img1.jpg", "/img2.jpg"] |

### Content Sections

All section fields are optional but recommended:

#### Overview
General introduction and overview of the monastery.
- **Recommended length:** 100-500 words
- **Include:** Brief history, significance, unique features

#### History
Detailed historical background.
- **Recommended length:** 200-1000 words
- **Include:** Founding story, historical events, evolution

#### Architecture
Architectural features and design elements.
- **Recommended length:** 150-500 words
- **Include:** Building style, materials, notable structures

#### Rituals & Practices
Religious ceremonies and daily practices.
- **Recommended length:** 150-500 words
- **Include:** Daily prayers, festivals, special ceremonies

#### Best Time to Visit
Visiting recommendations and seasonal information.
- **Recommended length:** 50-200 words
- **Include:** Best months, weather, festival times

#### Travel Information
Practical travel details.
- **Recommended length:** 100-300 words
- **Include:** How to reach, accommodation, local transport

#### Digital Archive
Links to digital resources.
- **Recommended length:** 50-200 words
- **Include:** Online resources, virtual tours, documents

## Step-by-Step Guide

### Step 1: Gather Information
Collect all necessary information about the monastery:
- [ ] Basic details (name, location, founded date)
- [ ] High-quality hero image (landscape, min 1920x1080px)
- [ ] Gallery images (3-10 images recommended)
- [ ] Content for each section
- [ ] Source references (for verification)

### Step 2: Prepare Images
Store images in the appropriate folder:
```
public/monasteries/[monastery-slug]/
  ├── hero.jpg          (Main image)
  ├── gallery-1.jpg
  ├── gallery-2.jpg
  └── gallery-3.jpg
```

### Step 3: Create Entry

#### Method A: Using Admin Dashboard
1. Go to `http://localhost:3000/admin/monasteries`
2. Click "Add Monastery"
3. Fill in the form:
   - **Name:** Enter full monastery name (slug auto-generates)
   - **Location:** City, State format
   - **Altitude:** Include unit (e.g., "1,550 m")
   - **Founded:** Year or full date
   - **Short Description:** Brief one-liner
   - **Hero Image:** Path to main image
   - **Gallery:** Add multiple image paths
   - **Sections:** Fill in content for each tab
4. Click "Verify Information" (AI checks accuracy)
5. Save as Draft or Publish

#### Method B: Using API
```typescript
const response = await fetch('/api/monasteries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Monastery Name',
    location: 'City, State',
    // ... other fields
  }),
});
```

### Step 4: Review & Publish
1. Check preview in dashboard
2. Verify all information
3. Test image loading
4. Publish when ready

## Validation Rules

### Name Rules
- ✅ Min 3 characters, max 100
- ✅ Can include letters, numbers, spaces
- ❌ No special characters except hyphens and apostrophes

### Slug Rules
- ✅ Auto-generated from name
- ✅ Lowercase, URL-safe
- ✅ Hyphens replace spaces
- ✅ Must be unique

### Image Rules
- ✅ Supported formats: .jpg, .jpeg, .png, .avif, .webp
- ✅ Recommended size: 1920x1080px minimum
- ✅ Max file size: 5MB per image
- ✅ Use relative paths (e.g., /monasteries/rumtek/hero.jpg)

### Content Rules
- ✅ Use Markdown for formatting
- ✅ Keep paragraphs concise
- ✅ Include proper citations
- ✅ Fact-check before publishing

## AI Verification

Before publishing, the system verifies:
- ✅ Name accuracy
- ✅ Location validity
- ✅ Historical facts
- ✅ Altitude correctness
- ✅ Founding date accuracy

If verification fails, review the information and correct any inaccuracies.

## Examples

### Minimal Entry (Draft)
```typescript
{
  name: "New Monastery",
  location: "Gangtok, Sikkim",
  founded: "1800",
  shortDescription: "A historic monastery in the heart of Gangtok",
  heroImageUrl: "/monasteries/new-monastery/hero.jpg",
  isPublished: false
}
```

### Complete Entry (Published)
```typescript
{
  name: "Rumtek Monastery",
  slug: "rumtek-monastery",
  location: "Rumtek, Sikkim",
  district: "East Sikkim",
  altitude: "1,550 m",
  founded: "1960",
  shortDescription: "The largest monastery in Sikkim and seat of the Karmapa",
  heroImageUrl: "/rumtek/rumtek1.avif",
  gallery: [
    "/rumtek/rumtek2.avif",
    "/rumtek/rumtek3.avif",
    "/rumtek/rumtek4.avif"
  ],
  sections: {
    overview: "Rumtek Monastery, also called Dharma Chakra Centre...",
    history: "Founded in 1960 by the 16th Karmapa...",
    architecture: "The monastery features traditional Tibetan architecture...",
    rituals: "Daily prayer sessions are held at 6 AM and 6 PM...",
    bestVisitTime: "Visit between October and March for clear skies...",
    travelInfo: "Located 24 km from Gangtok. Regular taxis available..."
  },
  isPublished: true
}
```

## Troubleshooting

### Common Issues

**Slug already exists**
- Solution: Modify the name slightly or manually edit the slug

**Image not loading**
- Solution: Check file path, ensure image exists in public folder

**Verification failed**
- Solution: Review information accuracy, check historical facts

**Form won't submit**
- Solution: Check all required fields are filled, check browser console for errors

## Best Practices

1. **Write Clear Descriptions**
   - Use simple, accessible language
   - Avoid jargon unless explained
   - Keep sentences concise

2. **Optimize Images**
   - Compress images before uploading
   - Use modern formats (AVIF, WebP)
   - Include descriptive alt text

3. **Structure Content**
   - Use headings and paragraphs
   - Break up long text blocks
   - Include bullet points where appropriate

4. **Cite Sources**
   - Include source references
   - Link to external resources
   - Credit photographers/contributors

5. **Test Before Publishing**
   - Save as draft first
   - Preview the page
   - Check all links and images
   - Verify information accuracy

## Support

For issues or questions:
- Check the dashboard documentation
- Review existing monastery entries
- Contact the admin team
- Refer to the API documentation

---

**Last Updated:** December 2025  
**Version:** 1.0
