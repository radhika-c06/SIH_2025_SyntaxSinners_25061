# Admin Login Backend System

## Overview
A complete authentication system for admin users with JWT token-based session management, 2FA support, and role-based access control.

## Components Created/Updated

### 1. Authentication Context (`lib/context/AuthContext.tsx`)
- **Purpose**: Global state management for admin authentication
- **Features**:
  - `useAuth()` hook for accessing auth state across components
  - `login()` - Authenticate with email/password
  - `verify2FA()` - Verify TOTP code for 2FA
  - `logout()` - Clear session and cookies
  - Auto-check auth status on app load
  - Error management

### 2. Authentication Middleware (`lib/auth/middleware.ts`)
- **Functions**:
  - `verifyAdminAuth()` - Verify JWT token from cookies
  - `unauthorizedResponse()` - Return 401 response
  - `forbiddenResponse()` - Return 403 response
- **Usage**: Protect API endpoints that require admin authentication

### 3. Protected Route Component (`components/ProtectedRoute.tsx`)
- **Purpose**: Wrapper component to protect admin pages
- **Features**:
  - Checks authentication status
  - Redirects to login if not authenticated
  - Shows loading state during auth check
  - Supports role-based access control via `requiredRole` prop
  - Example: `<ProtectedRoute requiredRole="superadmin">`

### 4. API Endpoints

#### `/api/auth/login` (POST)
- **Existing**: Authenticates admin with email/password
- **Returns**: JWT token in cookie + admin data
- **Features**: 2FA support for enabled accounts

#### `/api/auth/me` (GET) - NEW
- **Purpose**: Get current authenticated admin info
- **Returns**: Admin details (id, name, email, role)
- **Auth**: Requires valid JWT token

#### `/api/auth/logout` (POST) - EXISTING
- **Purpose**: Clear admin session
- **Action**: Expires admin_token and admin_2fa_temp cookies

#### `/api/auth/2fa/verify` (POST)
- **Existing**: Verify TOTP code for 2FA
- **Usage**: After login with 2FA enabled

### 5. Protected Pages

#### `/admin/dashboard`
- Wrapped with `ProtectedRoute`
- Redirects to login if not authenticated

#### `/admin/submissions`
- Wrapped with `ProtectedRoute`
- Requires authentication

#### `/admin/submissions/[id]`
- Wrapped with `ProtectedRoute`
- Requires authentication

### 6. Updated Root Layout (`app/layout.tsx`)
- Wrapped entire app with `<AuthProvider>`
- Enables `useAuth()` hook throughout the app

## Authentication Flow

### Login Flow
```
1. User visits /admin
2. Enters email/password in login form
3. Form calls POST /api/auth/login
4. Backend validates credentials in MongoDB
5. If valid, sets admin_token cookie + returns admin data
6. AuthContext updates state
7. User redirected to /admin/dashboard
```

### 2FA Flow
```
1. Login triggers 2FA requirement
2. Admin sets needs2FA = true
3. TOTP input form appears
4. User enters 6-digit code
5. Form calls POST /api/auth/2fa/verify
6. Backend validates TOTP against stored secret
7. If valid, sets admin_token cookie
8. Redirected to dashboard
```

### Protected Route Access
```
1. User navigates to /admin/dashboard
2. ProtectedRoute component checks auth
3. Calls GET /api/auth/me to verify token
4. AuthContext loads user data
5. If authenticated, shows dashboard
6. If not authenticated, redirects to /admin login page
```

### Logout Flow
```
1. User clicks logout button
2. Calls POST /api/auth/logout
3. Backend expires both cookies
4. AuthContext clears user data
5. User redirected to /admin login page
```

## Data Models

### AdminUser (MongoDB)
```typescript
{
  _id: ObjectId
  name: string
  email: string (unique, lowercase)
  passwordHash: string (hashed with bcrypt)
  totpSecret?: string (optional, for 2FA)
  is2FAEnabled?: boolean
  role: 'superadmin' | 'editor'
  createdAt: Date
  updatedAt: Date
}
```

### Auth Context State
```typescript
{
  admin: { id, name, email, role } | null
  loading: boolean
  isAuthenticated: boolean
  error: string | null
}
```

## Security Features

1. **JWT Tokens**: Secure HTTP-only cookies with configurable expiration
2. **Password Hashing**: Bcrypt with salt rounds for secure storage
3. **2FA/TOTP**: Time-based One-Time Password for additional security
4. **Role-Based Access**: Superadmin vs Editor roles for permission control
5. **Protected Routes**: Client-side route protection with redirect to login
6. **Token Verification**: Server-side verification of JWT before granting access

## Environment Variables Needed

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
NODE_ENV=production
```

## Usage Examples

### Using Auth in Components
```tsx
import { useAuth } from '@/lib/context/AuthContext';

export function MyComponent() {
  const { admin, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated && (
        <>
          <p>Welcome, {admin?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
```

### Protecting Pages
```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="superadmin">
      <AdminContent />
    </ProtectedRoute>
  );
}
```

### API Endpoint Protection
```typescript
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  const auth = verifyAdminAuth(request);
  
  if (!auth.authenticated) {
    return unauthorizedResponse(auth.error);
  }
  
  // Protected code here
  const { adminId, role } = auth;
}
```

## Testing Checklist

- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test 2FA setup and verification
- [ ] Test logout clears cookies
- [ ] Test protected routes redirect to login when not authenticated
- [ ] Test protected routes allow access when authenticated
- [ ] Test role-based access control
- [ ] Test JWT expiration and refresh
- [ ] Test concurrent session handling
- [ ] Test CORS if frontend on different domain

## Future Enhancements

1. Token refresh mechanism for long sessions
2. Session management (view/revoke active sessions)
3. Login activity logs
4. IP-based security restrictions
5. Rate limiting on login attempts
6. Passwordless login options
7. OAuth2 integration
8. Audit trail for admin actions
