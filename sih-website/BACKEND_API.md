# Monastery360 Admin Backend API Documentation

## Overview

The Monastery360 admin backend is built with Next.js 14 and provides a complete REST API for managing monastery content, admin users, and contributor submissions.

## Authentication

All admin-only endpoints require authentication via JWT token stored in the `admin_token` HttpOnly cookie.

### Environment Variables

```env
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key-change-in-production
ADMIN_INVITE_CODE=optional-invite-code-for-registration
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new admin user.

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "secure-password",
  "inviteCode": "optional-if-ADMIN_INVITE_CODE-is-set"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "editor"
  }
}
```

#### POST `/api/auth/login`
Authenticate and receive JWT cookie.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure-password"
}
```

**Response (200):**
- Sets `admin_token` HttpOnly cookie (7-day expiry)
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "editor"
  }
}
```

#### POST `/api/auth/logout`
Clear authentication session.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

### Submissions (Contributor Content)

#### POST `/api/submissions`
Create a new contributor submission (public endpoint).

**Request Body:**
```json
{
  "monasteryName": "Rumtek Monastery",
  "location": "Gangtok, Sikkim",
  "contributorName": "John Doe",
  "contributorEmail": "john@example.com",
  "rawContent": {
    "description": "...",
    "heroImage": "image-url",
    "gallery": [...],
    "sections": [...]
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "submission-id",
    "monasteryName": "...",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### GET `/api/submissions`
List all submissions (admin only).

**Query Parameters:**
- `status`: Filter by 'pending', 'approved', or 'rejected'
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "submissions": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "pages": 5
    }
  }
}
```

#### GET `/api/submissions/[id]`
Get submission details (admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "submission-id",
    "monasteryName": "...",
    "status": "pending",
    "linkedMonasteryId": null
  }
}
```

#### PATCH `/api/submissions/[id]/review`
Review and approve/reject submission (admin only).

**Request Body:**
```json
{
  "status": "approved",
  "reviewNotes": "Content looks good",
  "createMonastery": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "submission-id",
    "status": "approved",
    "linkedMonasteryId": "monastery-id"
  }
}
```

### Monasteries

#### GET `/api/monasteries`
List all monasteries. Shows published monasteries publicly, all monasteries with `?admin=true`.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `admin`: Set to 'true' for admin view (shows drafts)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "monasteries": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

#### POST `/api/monasteries`
Create a new monastery (admin only).

**Request Body:**
```json
{
  "name": "Rumtek Monastery",
  "location": "Gangtok, Sikkim",
  "district": "Sikkim",
  "altitude": 1700,
  "founded": "1716",
  "shortDescription": "A historic monastery...",
  "heroImageUrl": "image-url",
  "gallery": ["image-url-1", "image-url-2"],
  "sections": [
    {
      "key": "history",
      "title": "History",
      "content": "..."
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "monastery-id",
    "slug": "rumtek-monastery",
    "name": "Rumtek Monastery",
    "isPublished": false
  }
}
```

#### GET `/api/monasteries/[id]`
Get monastery details. Can use MongoDB ID or slug. Checks publication status for public users.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "monastery-id",
    "slug": "rumtek-monastery",
    "name": "Rumtek Monastery",
    "sections": [...]
  }
}
```

#### PATCH `/api/monasteries/[id]`
Update monastery (admin only). Cannot modify slug via PATCH.

**Request Body:**
```json
{
  "name": "Updated Name",
  "shortDescription": "Updated description",
  "isPublished": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "monastery-id",
    "slug": "rumtek-monastery",
    "name": "Updated Name",
    "isPublished": true
  }
}
```

#### DELETE `/api/monasteries/[id]`
Delete monastery (admin only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Monastery deleted successfully"
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Status Codes:**
- `400` - Bad request (validation error)
- `401` - Unauthorized (missing/invalid auth token)
- `403` - Forbidden (invalid invite code)
- `404` - Not found
- `500` - Internal server error

## Data Models

### AdminUser
- `_id`: MongoDB ID
- `name`: Display name
- `email`: Unique email (indexed)
- `passwordHash`: bcrypt hash (never returned)
- `role`: 'superadmin' or 'editor'
- `createdAt`, `updatedAt`: Timestamps

### Monastery
- `slug`: URL-safe unique identifier (indexed)
- `name`: Monastery name
- `location`: Location string
- `district`: District/region
- `altitude`: Elevation in meters
- `founded`: Year/date founded
- `shortDescription`: Brief description
- `heroImageUrl`: Main image URL
- `gallery`: Array of image URLs
- `sections`: Array of {key, title, content} objects
- `isPublished`: Publication status (indexed)
- `createdAt`, `updatedAt`: Timestamps

### ContributorSubmission
- `monasteryName`: Name of monastery
- `location`: Location of monastery
- `contributorName`: Submitter name
- `contributorEmail`: Submitter email
- `rawContent`: Flexible JSON object
- `status`: 'pending', 'approved', or 'rejected' (indexed)
- `reviewNotes`: Admin review feedback
- `linkedMonasteryId`: Reference to created Monastery
- `createdAt`, `updatedAt`: Timestamps

## Features

- **JWT Authentication**: Secure token-based auth with HttpOnly cookies
- **Password Hashing**: bcryptjs with 10 salt rounds
- **MongoDB Connection Caching**: Prevents multiple connections in development
- **Invite Code Protection**: Optional registration gate
- **Slug Auto-Generation**: Automatic URL-safe slugs with uniqueness handling
- **Flexible Sections**: Dynamic content blocks for monasteries
- **Status Tracking**: Full submission workflow with review notes
- **Type Safety**: Full TypeScript support with interfaces

## Development

Install dependencies:
```bash
npm install mongoose bcryptjs jsonwebtoken
```

Ensure environment variables are set in `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/monastery360
JWT_SECRET=your-development-secret
ADMIN_INVITE_CODE=dev-invite-code
```

All routes follow Next.js 14 App Router pattern with route handlers in `/app/api/*/route.ts`.
