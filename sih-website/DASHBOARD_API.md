# Dashboard Backend API Documentation

## Overview

The dashboard backend provides real-time data endpoints for the admin dashboard, including statistics, activity logs, charts, and contributor information.

## API Endpoints

### 1. Dashboard Stats
**Endpoint:** `GET /api/dashboard/stats`

Returns overall dashboard statistics including monastery counts, submission status, and contributor information.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalMonasteries": 12,
    "pendingSubmissions": 5,
    "publishedMonasteries": 10,
    "contributors": 24,
    "totalSubmissions": 35
  }
}
```

**Fields:**
- `totalMonasteries`: Total number of monasteries in the database
- `pendingSubmissions`: Number of submissions awaiting review
- `publishedMonasteries`: Number of published monastery pages
- `contributors`: Total unique contributors
- `totalSubmissions`: Total submissions received

---

### 2. Recent Activity
**Endpoint:** `GET /api/dashboard/activity`

Returns the 10 most recent activities (submissions, monastery updates, approvals).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "action": "approved",
      "user": "Monika",
      "target": "Tashiding Monastery",
      "timestamp": "2024-12-08T10:30:00Z",
      "type": "submission"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "action": "submitted",
      "user": "Rajesh Kumar",
      "target": "Pemayangtse Monastery",
      "timestamp": "2024-12-08T09:15:00Z",
      "type": "submission"
    }
  ]
}
```

**Activity Types:**
- `action`: approved, submitted, updated, published, rejected
- `type`: submission, monastery, approval

---

### 3. Submissions Chart Data
**Endpoint:** `GET /api/dashboard/submissions-chart`

Returns monthly submission statistics for the last 6 months (for chart visualization).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "month": "Jul 24",
      "approved": 3,
      "pending": 1,
      "rejected": 0
    },
    {
      "month": "Aug 24",
      "approved": 5,
      "pending": 2,
      "rejected": 1
    }
  ]
}
```

---

### 4. Top Contributors
**Endpoint:** `GET /api/dashboard/top-contributors`

Returns the top 10 contributors based on submission count.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "contrib-0",
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "submissions": 15,
      "approved": 12,
      "pendingReview": 2
    },
    {
      "id": "contrib-1",
      "name": "Sarah Chen",
      "email": "sarah@example.com",
      "submissions": 10,
      "approved": 9,
      "pendingReview": 1
    }
  ]
}
```

---

## Error Handling

All endpoints follow this error response format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- `200`: Success
- `500`: Server error

---

## Usage in Components

### Using Direct Fetch

```typescript
const response = await fetch('/api/dashboard/stats');
const data = await response.json();
if (data.success) {
  // Use data.data
}
```

### Using Custom Hooks (Recommended)

The `useDashboard.ts` hook provides convenient methods:

```typescript
import {
  useDashboardStats,
  useDashboardActivity,
  useDashboardChart,
  useDashboardContributors,
} from '@/lib/hooks/useDashboard';

export function MyComponent() {
  const { stats, loading, error } = useDashboardStats();
  const { activities } = useDashboardActivity();
  const { chartData } = useDashboardChart();
  const { contributors } = useDashboardContributors();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // Use stats, activities, chartData, contributors
  );
}
```

---

## Database Requirements

The endpoints expect the following MongoDB collections:

1. **monasteries**
   - `_id`: ObjectId
   - `name`: String
   - `isPublished`: Boolean
   - `createdAt`: Date
   - `updatedAt`: Date

2. **submissions**
   - `_id`: ObjectId
   - `monasteryName`: String
   - `contributorName`: String
   - `contributorEmail`: String
   - `status`: String (pending, approved, rejected)
   - `createdAt`: Date
   - `updatedAt`: Date

---

## Performance Considerations

- Stats endpoint uses aggregation pipeline for efficiency
- Activity endpoint limits to 10 most recent items
- Chart data is calculated for 6-month window
- Consider implementing caching for frequently accessed endpoints

---

## Future Enhancements

- [ ] Add filtering options (date range, status)
- [ ] Implement caching layer for stats
- [ ] Add real-time updates via WebSocket
- [ ] Export data functionality (CSV, PDF)
- [ ] Advanced analytics and trends
- [ ] Performance monitoring and logs
