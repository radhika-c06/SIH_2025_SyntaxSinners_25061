# Draft vs Published Monastery Workflow - Implementation Complete

## Overview
The monastery management system now properly separates draft and published monasteries with visibility controls.

## Components Updated

### 1. MonasterySlideshow Component
- **Location:** `components/MonasterySlideshow.tsx`
- **Changes:**
  - Removed hardcoded monastery array
  - Now fetches from `/api/monasteries?admin=false` endpoint
  - Only displays published monasteries (`isPublished: true`)
  - Added loading and empty states
  - Links use dynamic slug from database
- **Behavior:** Only published monasteries appear on main site

### 2. MonasteryMap Component
- **Location:** `components/MonasteryMap.tsx`
- **Changes:**
  - Removed hardcoded monastery array
  - Now fetches from `/api/monasteries?admin=false` endpoint
  - Enriches data with UI map positions
  - Only displays published monasteries
  - Added loading and empty states
- **Behavior:** Only published monasteries appear on map visualization

### 3. New Monastery Creation Form
- **Location:** `app/admin/monasteries/new/page.tsx`
- **Features:**
  - Status selection: Draft or Published
  - Confirmation modal before saving
  - Shows what status will be applied
  - Visual indicators (green for Published, blue for Draft)
  - Validates required fields (name, location)
  - Saves with `isPublished` flag based on selection
- **Behavior:**
  - Select "Draft" → monastery saved with `isPublished: false` → only visible in admin
  - Select "Published" → monastery saved with `isPublished: true` → immediately appears on main site

## API Endpoint Behavior

### GET /api/monasteries
```
Query Parameters:
- admin=true   → Returns ALL monasteries (draft + published) for admin use
- admin=false  → Returns ONLY published monasteries (isPublished: true) for public

Default: Returns published only if admin param not specified
```

### POST /api/monasteries
```
Accepts: isPublished field in request body
Sets: Sets monastery publication status based on request value
```

## Database Model

**Monastery Schema includes:**
- `isPublished: Boolean` (default: false)
- `slug: String` (unique, URL-safe)
- `name: String` (required)
- `location: String` (required)
- `description: String`
- `image: String`
- And other monastery details...

## Visibility Matrix

| Monastery Status | Admin Dashboard | Main Website Pages | Map Component | Slideshow |
|---|---|---|---|---|
| Draft | ✅ Visible | ❌ Hidden | ❌ Hidden | ❌ Hidden |
| Published | ✅ Visible | ✅ Visible | ✅ Visible | ✅ Visible |

## Workflow: Creating a New Monastery

### Step 1: Navigate to Admin
- Go to `/admin/monasteries`
- Click "Add New Monastery"

### Step 2: Fill Form
- Enter monastery name (required)
- Enter location (required)
- Fill altitude, founded year, description
- Add hero image URL
- Add gallery images (optional)
- Add content sections (optional)
- Select Status: "Draft" or "Published"

### Step 3: Confirmation
- Click "Save as Draft" or "Publish"
- Modal appears showing:
  - Monastery name
  - Location
  - Selected status (with color indicator)
  - Message explaining what will happen
- Confirm or cancel

### Step 4: Result
- **If Draft:** Monastery appears only in admin dashboard, NOT on main site
- **If Published:** Monastery immediately appears on:
  - Main page slideshow
  - Sacred Geography map
  - Any other public-facing components that fetch from the API

## Testing the Workflow

### Test 1: Create Draft Monastery
1. Create a new monastery as "Draft"
2. Go to main website (/)
3. Verify it does NOT appear in slideshow or map
4. Go back to /admin/monasteries
5. Verify it DOES appear in admin list with Draft status

### Test 2: Create Published Monastery
1. Create a new monastery as "Published"
2. Go to main website (/)
3. Verify it DOES appear in slideshow and map
4. Check map shows location correctly
5. Check slideshow rotates through all published monasteries

### Test 3: Verify Public Filtering
1. All public components fetch with `?admin=false`
2. Draft monasteries never appear on public pages
3. Admin dashboard always shows all monasteries

## Files Modified

1. `components/MonasterySlideshow.tsx` - Complete rewrite with API fetching
2. `components/MonasteryMap.tsx` - Complete rewrite with API fetching
3. `app/admin/monasteries/new/page.tsx` - Added confirmation modal and status selection
4. `app/api/monasteries/route.ts` - Already had proper filtering logic

## Notes

- The `/api/monasteries` endpoint was already correctly filtering monasteries based on the `admin` query parameter
- The Monastery model already had the `isPublished` field
- Public components now properly respect the `isPublished` status
- Admin dashboard still shows mock data but structure is ready for API integration
