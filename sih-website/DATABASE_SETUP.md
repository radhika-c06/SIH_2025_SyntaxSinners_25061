# Prisma Database Setup & API Usage Guide

## 📦 Installation

```bash
npm install prisma @prisma/client
npm install -D prisma
```

## 🔧 Setup Steps

### 1. Initialize Prisma (Already Done)
The schema is already created at `prisma/schema.prisma`

### 2. Configure Database URL
Copy `.env.example` to `.env` and update your database connection:

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/sikkim_monasteries"
```

### 3. Create Database Migration
```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. (Optional) Seed Initial Data
Create `prisma/seed.ts` to migrate your existing static data.

## 🚀 API Endpoints

### Get All Monasteries
```
GET /api/monasteries
```

### Get Single Monastery
```
GET /api/monasteries/[slug]
```

### Create New Monastery (Admin)
```
POST /api/monasteries
Content-Type: application/json

{
  "slug": "pemayangtse",
  "name": "Pemayangtse Monastery",
  "location": "Pelling, West Sikkim",
  "established": "1705 CE",
  "overview": "One of the oldest monasteries in Sikkim...",
  "imageUrl": "/pemayangtse/main.jpg",
  "digitalArchive": {
    "description": "Explore the rich collection...",
    "items": [
      {
        "title": "Ancient Manuscripts",
        "type": "Document",
        "description": "Historical texts..."
      }
    ]
  },
  "audioTour": {
    "description": "Guided tour of the monastery...",
    "duration": "18:30",
    "audioFile": "/pemayangtse/audio.mp3"
  },
  "culturalCalendar": {
    "description": "Annual festivals...",
    "events": [
      {
        "name": "Losar Festival",
        "date": "February",
        "description": "Tibetan New Year celebration"
      }
    ]
  },
  "virtualTour": {
    "description": "3D virtual tour experience...",
    "videoFile": "/pemayangtse/tour.mp4",
    "features": ["360° views", "HD quality", "Audio guide"]
  }
}
```

### Update Monastery (Admin)
```
PUT /api/monasteries/[slug]
Content-Type: application/json

{
  "name": "Updated Name",
  "overview": "Updated overview..."
}
```

### Delete Monastery (Admin)
```
DELETE /api/monasteries/[slug]
```

## 🔐 Add Authentication

To protect admin routes, integrate NextAuth.js or Clerk:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is admin
  const isAdmin = checkAdminStatus(request);
  
  if (request.nextUrl.pathname.startsWith('/api/monasteries') && 
      request.method !== 'GET' && !isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  matcher: '/api/monasteries/:path*',
};
```

## 📊 Prisma Studio (Database GUI)

View and edit data visually:
```bash
npx prisma studio
```

## 🔄 Update Dynamic Route to Use Database

Update `app/monasteries/[id]/page.tsx`:

```typescript
import { MonasteryService } from '@/lib/services/monastery.service';

export default async function Page({ params }: { params: { id: string } }) {
  const monastery = await MonasteryService.getBySlug(params.id);
  
  if (!monastery) {
    return <div>Monastery Not Found</div>;
  }
  
  // Parse JSON fields with type safety
  const digitalArchive = monastery.digitalArchive as any;
  const audioTour = monastery.audioTour as any;
  const culturalCalendar = monastery.culturalCalendar as any;
  const virtualTour = monastery.virtualTour as any;
  
  // Render monastery data...
}
```

## 📝 Notes

- All JSON fields are type-safe using TypeScript interfaces
- Slug is unique and indexed for fast lookups
- Timestamps (createdAt, updatedAt) are automatic
- Use Prisma Studio for easy data management
- Add authentication before deploying to production
