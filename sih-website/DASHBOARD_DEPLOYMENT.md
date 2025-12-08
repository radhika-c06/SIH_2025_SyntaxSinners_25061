# Dashboard Backend Deployment Guide

## Quick Start

### Prerequisites
- MongoDB connection configured in `.env.local`
- Next.js application running
- Node.js 16+

### Installation

1. **API Routes** (automatically available at `/api/dashboard/*`)
   - Stats endpoint: `/api/dashboard/stats`
   - Activity endpoint: `/api/dashboard/activity`
   - Chart endpoint: `/api/dashboard/submissions-chart`
   - Contributors endpoint: `/api/dashboard/top-contributors`

2. **Custom Hooks** (in `lib/hooks/useDashboard.ts`)
   ```bash
   # Already included, no installation needed
   ```

3. **Dashboard Page** (updated at `app/admin/dashboard/page.tsx`)
   ```bash
   # Already updated with backend integration
   ```

## Configuration

### Environment Variables (`.env.local`)

```
NEXT_PUBLIC_API_URL=/api
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
```

### MongoDB Collections Setup

Ensure these collections exist in your MongoDB:

#### Monasteries Collection
```javascript
db.createCollection("monasteries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "slug", "isPublished"],
      properties: {
        name: { bsonType: "string" },
        slug: { bsonType: "string" },
        isPublished: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.monasteries.createIndex({ "isPublished": 1 });
db.monasteries.createIndex({ "createdAt": -1 });
```

#### Submissions Collection
```javascript
db.createCollection("submissions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["monasteryName", "contributorEmail", "status"],
      properties: {
        monasteryName: { bsonType: "string" },
        contributorName: { bsonType: "string" },
        contributorEmail: { bsonType: "string" },
        status: { enum: ["pending", "approved", "rejected"] },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.submissions.createIndex({ "status": 1 });
db.submissions.createIndex({ "createdAt": -1 });
db.submissions.createIndex({ "contributorEmail": 1 });
```

## Testing

### 1. Test Individual Endpoints

```bash
# Terminal 1: Start development server
npm run dev

# Terminal 2: Test endpoints
curl http://localhost:3000/api/dashboard/stats
curl http://localhost:3000/api/dashboard/activity
curl http://localhost:3000/api/dashboard/submissions-chart
curl http://localhost:3000/api/dashboard/top-contributors
```

### 2. Test Dashboard Page

1. Navigate to `http://localhost:3000/admin/dashboard`
2. Verify stats cards load with correct values
3. Verify activity feed displays recent items
4. Check browser console for any errors

### 3. Manual Testing Checklist

- [ ] Stats display correct numbers
- [ ] Activity feed shows recent submissions
- [ ] Loading states appear during data fetch
- [ ] Error handling works (test by taking MongoDB offline)
- [ ] Fallback mock data appears on error
- [ ] Quick action buttons link to correct pages
- [ ] Summary section shows correct percentages
- [ ] Navigation links work correctly

## Troubleshooting

### Stats Show 0 for All Values

**Solution:**
1. Check MongoDB connection: `MONGODB_URI` in `.env.local`
2. Verify collections exist with data
3. Check browser console for API errors
4. Review server logs: `npm run dev`

### Activity Feed is Empty

**Solution:**
1. Ensure submissions collection has documents
2. Check that documents have required fields (createdAt, updatedAt)
3. Verify `status` field exists in submissions

### API Returns 500 Error

**Solution:**
1. Check server console for error messages
2. Verify database connection string is correct
3. Check that collections have proper schema
4. Review MongoDB connection permissions

### Hooks Not Working

**Solution:**
1. Ensure hooks are imported from correct path: `@/lib/hooks/useDashboard`
2. Components using hooks must have `"use client"` directive
3. Check that Next.js version supports client components

## Performance Optimization

### Add Database Indexes

For better query performance:

```javascript
// Monasteries indexes
db.monasteries.createIndex({ "isPublished": 1, "createdAt": -1 });

// Submissions indexes  
db.submissions.createIndex({ "status": 1, "createdAt": -1 });
db.submissions.createIndex({ "contributorEmail": 1, "createdAt": -1 });
```

### Implement Caching

Consider adding Redis caching for frequently accessed endpoints:

```typescript
// Example: Cache stats for 5 minutes
const CACHE_TTL = 300; // 5 minutes

export async function GET(request: NextRequest) {
  const cached = await redis.get('dashboard:stats');
  if (cached) return NextResponse.json(JSON.parse(cached));
  
  // ... fetch data ...
  
  await redis.setex('dashboard:stats', CACHE_TTL, JSON.stringify(data));
  return NextResponse.json(data);
}
```

## Security

### Add Authentication

Add auth check to all dashboard endpoints:

```typescript
import { getAuthenticatedAdmin } from '@/lib/auth/getAuthenticatedAdmin';

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // ... rest of endpoint ...
}
```

### Rate Limiting

Implement rate limiting for public or sensitive endpoints:

```typescript
// Add rate limiting middleware
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## Deployment to Production

### Vercel Deployment

```bash
# Push to GitHub
git add .
git commit -m "Add dashboard backend"
git push

# Vercel automatically deploys on push
# Or deploy manually:
vercel --prod
```

### Environment Variables Setup

1. Go to Vercel Dashboard
2. Select your project
3. Settings > Environment Variables
4. Add:
   - `NEXT_PUBLIC_API_URL=/api`
   - `MONGODB_URI=<your-mongodb-url>`

### Monitoring

1. Set up error tracking (Sentry, LogRocket)
2. Monitor API response times
3. Set up alerts for endpoint failures
4. Review logs regularly

## API Documentation

See `DASHBOARD_API.md` for complete API documentation.

## Maintenance

### Regular Tasks

1. **Weekly**: Check API error logs
2. **Monthly**: Analyze performance metrics
3. **Quarterly**: Review and optimize slow queries
4. **Annually**: Audit security and compliance

### Database Maintenance

```javascript
// Check collection stats
db.monasteries.stats()
db.submissions.stats()

// Rebuild indexes if needed
db.monasteries.reIndex()
db.submissions.reIndex()

// Compact collections
db.runCommand({ compact: 'monasteries' })
db.runCommand({ compact: 'submissions' })
```

## Support & Issues

For issues or questions:
1. Check error logs: `npm run dev` output
2. Review `DASHBOARD_API.md` for API details
3. Check browser DevTools console for frontend errors
4. Verify MongoDB connection and data
5. Test endpoints with `curl` directly

---

## File Structure Reference

```
sih-website/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       ├── layout.tsx      # Admin layout
│   │       └── page.tsx        # Updated with backend integration
│   └── api/
│       └── dashboard/
│           ├── stats/route.ts
│           ├── activity/route.ts
│           ├── submissions-chart/route.ts
│           └── top-contributors/route.ts
├── lib/
│   ├── hooks/
│   │   └── useDashboard.ts    # Custom hooks
│   ├── db.ts                   # Database connection
│   └── api.ts                  # API utilities
└── types/
    └── admin.ts               # TypeScript types
```

---

**Last Updated:** December 8, 2025
