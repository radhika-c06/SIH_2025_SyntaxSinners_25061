# Data Contribution Form → Admin Submissions Integration

## Overview
Data submitted through the **Data Contribution Form** (`/app/data-contribution/page.tsx`) now automatically appears in the **Admin Submissions Panel** (`/admin/submissions`).

## How It Works

### 1. **Data Flow**
```
User fills Data Contribution Form
           ↓
Click "Submit"
           ↓
POST to /api/data-contribution
           ↓
Data saved to MongoDB (ContributorSubmission model)
           ↓
Admin sees submission in /admin/submissions
```

### 2. **Files Modified/Created**

#### Updated: `/api/data-contribution/route.ts`
- **POST endpoint**: Accepts form submission and saves to MongoDB
- **GET endpoint**: Returns all submissions for admin dashboard
- Now uses MongoDB instead of JSON file storage

#### Updated: `/api/data-contribution/[id]/route.ts`
- **GET endpoint**: Retrieves individual submission details
- **PUT endpoint**: Allows admin to approve/reject submissions and add review notes
- Now uses MongoDB with proper validation

#### Existing Files (No Changes Needed)
- `/app/data-contribution/page.tsx` - Form already calling `/api/data-contribution` ✅
- `/app/admin/submissions/page.tsx` - Already fetching from `/api/data-contribution` ✅
- `/app/admin/submissions/[id]/page.tsx` - Already has logic to handle both data contributions and media submissions ✅

### 3. **MongoDB Model Used**
All submissions stored using `ContributorSubmission` model:

```typescript
{
  _id: ObjectId,
  monasteryName: string,
  location: string,
  contributorName: string,
  contributorEmail: string,
  rawContent: {
    // Contains all form data
    id: string,
    timestamp: string,
    fullName: string,
    email: string,
    organization: string,
    monastery: string,
    dataType: string,
    location: string,
    altitude: string,
    founded: string,
    description: string,
    historicalPeriod: string,
    language: string,
    sourceReference: string,
    overview: string,
    history: string,
    architecture: string,
    rituals: string,
    bestVisitTime: string,
    travelInfo: string,
  },
  status: 'pending' | 'approved' | 'rejected',
  reviewNotes?: string,
  createdAt: Date,
  updatedAt: Date,
}
```

## Workflow

### Admin Side - Reviewing Submissions

1. **View All Submissions**
   ```
   Admin Dashboard → Submissions
   Shows all pending, approved, rejected submissions
   ```

2. **Review Individual Submission**
   ```
   Click on submission → View all details
   Shows: Name, Email, Organization, Monastery, Data Type, etc.
   ```

3. **Take Action**
   ```
   Approve: Submission status → "approved"
   Reject: Add review notes + status → "rejected"
   ```

### User Side - Submitting Data

1. **Fill Form**
   - Navigate to `/data-contribution`
   - Fill all required fields
   - Accept terms and conditions

2. **Submit**
   - Click "Submit"
   - Form validates locally
   - Sends POST request to `/api/data-contribution`

3. **Confirmation**
   - Success message shown
   - Form resets after 3 seconds
   - Submission now visible to admins

## API Endpoints

### POST `/api/data-contribution`
**Create new data contribution**

Request:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "organization": "Research Institute",
  "monastery": "Rumtek",
  "dataType": "Historical Records",
  "location": "Sikkim, India",
  "altitude": "5300 feet",
  "founded": "1960",
  "description": "...",
  "historicalPeriod": "20th Century",
  "language": "English",
  "sourceReference": "...",
  "overview": "...",
  "history": "...",
  "architecture": "...",
  "rituals": "...",
  "bestVisitTime": "...",
  "travelInfo": "..."
}
```

Response:
```json
{
  "message": "Data contribution submitted successfully",
  "id": "ObjectId"
}
```

### GET `/api/data-contribution`
**Fetch all submissions (with optional status filter)**

Query Parameters:
- `status`: 'All' | 'Pending' | 'Approved' | 'Rejected'

Response:
```json
[
  {
    "id": "ObjectId",
    "monasteryName": "Rumtek",
    "contributorName": "John Doe",
    "contributorEmail": "john@example.com",
    "status": "pending",
    "timestamp": "2025-12-09T10:30:00Z",
    "dataType": "Historical Records",
    // ... all other fields from rawContent
  }
]
```

### GET `/api/data-contribution/[id]`
**Fetch single submission details**

Response:
```json
{
  "id": "ObjectId",
  "monasteryName": "Rumtek",
  "contributorName": "John Doe",
  "contributorEmail": "john@example.com",
  "status": "pending",
  "timestamp": "2025-12-09T10:30:00Z",
  // ... all form data
}
```

### PUT `/api/data-contribution/[id]`
**Update submission status**

Request:
```json
{
  "status": "approved" | "rejected",
  "reviewNotes": "Optional review feedback"
}
```

Response:
```json
{
  "message": "Submission updated successfully",
  "submission": { /* updated submission object */ }
}
```

## Testing the Integration

### Step 1: Submit Form
1. Go to `/data-contribution`
2. Fill all required fields with test data
3. Click "Submit"
4. Verify success message

### Step 2: Check Admin Panel
1. Go to `/admin/submissions`
2. Your submission should appear in the list
3. Status should be "Pending" (gray badge)

### Step 3: Review Submission
1. Click on the submission in the list
2. See all details from the form
3. Click "Approve" or "Reject"
4. (For rejection) Add review notes
5. Submit

### Step 4: Verify Status Updated
1. Back to submissions list
2. Status should now show "Approved" or "Rejected"

## Key Features

✅ **Form Data → Database**: All submissions automatically saved to MongoDB
✅ **Admin Dashboard**: See all submissions with status filtering
✅ **Review Workflow**: Approve/Reject with optional notes
✅ **Status Tracking**: Pending → Approved/Rejected
✅ **Responsive UI**: Works on desktop and mobile
✅ **Error Handling**: Validation and error messages
✅ **Timestamp Tracking**: When submitted and updated

## Future Enhancements

- Email notifications to contributor when status changes
- Bulk approve/reject actions
- Search and filtering by monastery or data type
- Export submissions as CSV
- Admin comments visible to contributor
- Automatic monastery creation from approved submissions
