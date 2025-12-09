# Architecture Diagram: Published Monastery System

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       MONASTERY SYSTEM                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ ADMIN SIDE (Protected Routes)                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /admin/monasteries/new                                          │
│     ↓                                                            │
│  [Form Component]                                                │
│    • Name Input                                                  │
│    • Location Input                                              │
│    • Image URLs Input                                            │
│    • Content Sections Editor                                     │
│    • Published/Draft Toggle                                      │
│     ↓                                                            │
│  AI Verification API (/api/verify-monastery)                    │
│     ↓                                                            │
│  POST /api/monasteries                                          │
│    (with isPublished: true)                                      │
│     ↓                                                            │
│  MongoDB Save                                                    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ DATABASE (MongoDB)                                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Collection: monasteries                                         │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Document:                                               │    │
│  │ {                                                       │    │
│  │   _id: ObjectId,                                        │    │
│  │   name: "Rumtek Monastery",                             │    │
│  │   slug: "rumtek-monastery",        ← URL-safe ID       │    │
│  │   location: "Sikkim, India",                            │    │
│  │   altitude: "1600 meters",                              │    │
│  │   founded: "1960",                                      │    │
│  │   shortDescription: "...",                              │    │
│  │   heroImageUrl: "/path/to/hero.jpg",                   │    │
│  │   gallery: ["/img1.jpg", "/img2.jpg"],                 │    │
│  │   sections: [                        ← Dynamic content  │    │
│  │     {                                                   │    │
│  │       key: "overview",                                  │    │
│  │       title: "Overview",                                │    │
│  │       content: "Full HTML content..."                   │    │
│  │     },                                                  │    │
│  │     { key: "history", ... },                            │    │
│  │     { key: "architecture", ... },                       │    │
│  │     ...                                                 │    │
│  │   ],                                                    │    │
│  │   isPublished: true,         ← Public visibility flag   │    │
│  │   createdAt: Date,                                      │    │
│  │   updatedAt: Date                                       │    │
│  │ }                                                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ PUBLIC SIDE (Visitor Access)                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  User visits URL                                                 │
│  /all-monasteries/rumtek-monastery                              │
│     ↓                                                            │
│  Next.js Dynamic Route Handler                                   │
│  /app/all-monasteries/[slug]/page.tsx                            │
│     ↓                                                            │
│  Extract slug from URL params                                    │
│     ↓                                                            │
│  Fetch from API                                                  │
│  GET /api/monasteries/rumtek-monastery                          │
│     ↓                                                            │
│  API Handler                                                     │
│  /app/api/monasteries/[id]/route.ts                             │
│     ↓                                                            │
│  Query MongoDB                                                   │
│  Monastery.findOne({ slug: "rumtek-monastery" })                │
│     ↓                                                            │
│  Return Monastery Document                                       │
│     ↓                                                            │
│  Pass to Component                                               │
│  <MonasteryTemplate                                              │
│    name={data.name}                                              │
│    location={data.location}                                      │
│    sections={data.sections}                                      │
│    ...                                                           │
│  />                                                              │
│     ↓                                                            │
│  Render HTML                                                     │
│  • Hero Section with Images                                      │
│  • Overview Section                                              │
│  • Dynamic Sections (History, Architecture, etc)                │
│  • Digital Archive                                               │
│  • Footer                                                        │
│     ↓                                                            │
│  Display to User ✅                                              │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App Router
├── Admin Routes (Protected)
│   └── /admin/monasteries/new
│       ├── NewMonasteryPage (Form)
│       ├── StatusBadge (UI)
│       └── API Call → POST /api/monasteries
│
└── Public Routes
    └── /all-monasteries/[slug]
        ├── MonasteryPage (Dynamic Route)
        │   └── API Call → GET /api/monasteries/[slug]
        │
        └── MonasteryTemplate (Reusable Component)
            ├── Nav (Navigation)
            ├── Hero Section (with image carousel)
            ├── Overview Section (dynamic sections)
            ├── Digital Archive (grid)
            ├── Cultural Calendar
            ├── Audio Tour
            ├── Virtual Tour
            └── Footer
```

## Data Flow Diagram

```
CREATION FLOW:
──────────────

Admin Dashboard
      ↓
Form Input:
├─ Name
├─ Location  
├─ Images
├─ Sections
└─ isPublished: true
      ↓
Validation
      ↓
AI Verification
      ↓
Create Request
┌─────────────────────────┐
│ POST /api/monasteries   │
│ {                       │
│   name: "...",          │
│   sections: [...],      │
│   isPublished: true     │
│ }                       │
└─────────────────────────┘
      ↓
MongoDB Insert
┌──────────────────┐
│ _id: ObjectId    │
│ name: "..."      │
│ slug: "..."      │
│ isPublished: true│
│ ...              │
└──────────────────┘
      ↓
Confirmation
      ↓
✅ LIVE AT: /all-monasteries/[slug]


VIEWING FLOW:
─────────────

Browser
   ↓
/all-monasteries/rumtek
   ↓
URL: /all-monasteries/[slug]
   ↓
Extract: slug = "rumtek"
   ↓
Fetch: GET /api/monasteries/rumtek
   ↓
MongoDB Query
   ↓
{
  name: "Rumtek",
  location: "...",
  sections: [...],
  ...
}
   ↓
Pass to Component
   ↓
<MonasteryTemplate {...data} />
   ↓
Render HTML
   ↓
Browser Display ✅
```

## Relationship Map

```
┌─────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                           │
└─────────────────────────────────────────────────────────────┘

ADMIN PATH:
┌──────────────────┐      ┌───────────────────┐      ┌──────────────┐
│ Admin Dashboard  │─────▶│ Add New Monastery │─────▶│  Published   │
│ /admin           │      │ /admin/monasteries│      │ Live ✅      │
│                  │      │ /new              │      │              │
└──────────────────┘      └───────────────────┘      └──────────────┘
                                     │                       △
                                     │                       │
                          AI Verification           MonasteryData
                          Stored in MongoDB         in MongoDB


PUBLIC PATH:
┌──────────────────┐      ┌───────────────────┐      ┌──────────────┐
│  Home/Browse     │─────▶│  Monastery Page   │─────▶│  Template    │
│  Website         │      │ /all-monasteries/ │      │  Renders     │
│                  │      │ [slug]            │      │  with Data   │
└──────────────────┘      └───────────────────┘      └──────────────┘
                                     │                       △
                                     │                       │
                          API Fetch by Slug       Component Props
                          from MongoDB            Receive Data
```

## File Dependencies

```
MonasteryTemplate.tsx (Reusable)
    ↑
    │ imported by
    │
[slug]/page.tsx (Dynamic Route)
    ↑
    │ fetches from
    │
/api/monasteries/[id]/route.ts (API)
    ↑
    │ queries
    │
Monastery.ts (MongoDB Model)


Admin Form
    │
    │ posts to
    ▼
/api/monasteries/route.ts (API)
    │
    │ creates
    ▼
Monastery.ts (MongoDB Model)
    │
    │ data read by
    ▼
[slug]/page.tsx (Dynamic Route)
    │
    │ passes to
    ▼
MonasteryTemplate.tsx (Renders)
```

## State Machine: Monastery Lifecycle

```
┌──────────────┐
│  NOT CREATED │
└────────┬─────┘
         │ Admin creates form
         ▼
┌──────────────┐
│ FORM FILLED  │ (Not saved yet)
└────────┬─────┘
         │ Click Save as Published
         ▼
┌──────────────┐
│AI VERIFYING  │ (Verification in progress)
└────────┬─────┘
         │
         ├─ If Rejected ──────────────┐
         │                            │
         │ If Approved               ▼
         ▼                    ┌──────────────────┐
┌──────────────┐             │ VERIFICATION     │
│ PUBLISHED    │             │ FAILED - CANNOT  │
│ (Live) ✅    │             │ PUBLISH          │
└──────┬───────┘             └──────────────────┘
       │
       │ Admin edits & saves
       │
       └─ Goes back to FORM FILLED ──┐
                                      │
                                      ▼
                               (Re-verification cycle)


OR:

DRAFT FLOW:
┌──────────────┐
│ DRAFT SAVED  │ (Private, not visible)
└──────┬───────┘
       │ Admin changes to "Publish"
       ▼
┌──────────────┐
│ PUBLISHED ✅ │ (Now visible publicly)
└──────┬───────┘
       │ Admin changes back to "Draft"  
       ▼
┌──────────────┐
│ DRAFT SAVED  │ (Hidden again)
└──────────────┘
```

## Caching & Performance Considerations

```
┌────────────────────────────────────────────┐
│   Request Lifecycle                        │
├────────────────────────────────────────────┤
│                                            │
│ User Request                               │
│    ↓                                       │
│ Next.js Router Match [slug]                │
│    ↓                                       │
│ API Fetch from /api/monasteries/[slug]    │
│    ↓                                       │
│ MongoDB Query (indexed by slug)            │
│    ↓                                       │
│ Return Monastery Document                  │
│    ↓                                       │
│ Pass to MonasteryTemplate                  │
│    ↓                                       │
│ SSR Render → HTML                          │
│    ↓                                       │
│ Browser Receives HTML ✅                   │
│                                            │
│ Performance Optimization:                  │
│ • MongoDB index on slug for fast queries   │
│ • Sections array in one document           │
│ • Image URLs (not embedded binary)         │
│ • Reusable template component              │
│                                            │
└────────────────────────────────────────────┘
```

## Security Model

```
┌──────────────────────────────────────────────┐
│ PUBLIC ENDPOINTS (No Auth Required)          │
├──────────────────────────────────────────────┤
│                                              │
│ GET /api/monasteries                         │
│   └─ Returns only: isPublished = true        │
│                                              │
│ GET /api/monasteries/[slug]                  │
│   └─ Returns only: isPublished = true        │
│                                              │
│ GET /all-monasteries/[slug]                  │
│   └─ Page accessible to everyone             │
│                                              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ PROTECTED ENDPOINTS (Admin Auth Required)    │
├──────────────────────────────────────────────┤
│                                              │
│ POST /api/monasteries                        │
│   └─ Must be authenticated admin             │
│   └─ Can set isPublished flag                │
│                                              │
│ PATCH /api/monasteries/[id]                  │
│   └─ Must be authenticated admin             │
│   └─ Can change isPublished status           │
│                                              │
│ DELETE /api/monasteries/[id]                 │
│   └─ Must be authenticated admin             │
│                                              │
│ GET /admin/monasteries/new                   │
│   └─ Must be authenticated admin             │
│                                              │
└──────────────────────────────────────────────┘
```
