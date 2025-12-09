# Media Contributor Authentication System

## Overview
Complete authentication system for media contributors with user registration, login, and session management.

## Features Implemented

### Backend (Node.js/Express)
- **User Registration** (`POST /api/auth/register`)
  - Validates all required fields (fullName, email, password, phone)
  - Password hashing using SHA-256
  - Duplicate email detection
  - Stores users in `backend/users.json`
  
- **User Login** (`POST /api/auth/login`)
  - Email and password authentication
  - Password verification with hashing
  - Returns user data (without password)
  - Session management
  
- **User Verification** (`POST /api/auth/verify`)
  - Optional endpoint to verify user sessions
  - Returns user data by email

### Frontend (Next.js/React)

#### Registration Page (`/media-contribution/register`)
- Beautiful gradient form with warm brown theme
- Required fields:
  - Full Name
  - Email
  - Phone Number
  - Password
  - Confirm Password
- Terms and conditions checkbox
- Real-time validation
- API integration with backend
- Success message and auto-redirect to login

#### Login Page (`/media-contribution/login`)
- Email and password authentication
- Remember me checkbox
- Forgot password link (UI only)
- API integration with backend
- Session storage in localStorage
- Auto-redirect to media contribution page on success

## How It Works

### Registration Flow
1. User fills out registration form
2. Frontend validates input (password match, length, etc.)
3. POST request to `/api/auth/register`
4. Backend validates and checks for existing users
5. Password is hashed using SHA-256
6. User data saved to `users.json`
7. Success response returned
8. User redirected to login page

### Login Flow
1. User enters email and password
2. POST request to `/api/auth/login`
3. Backend finds user by email
4. Password is hashed and compared
5. On success, user data returned
6. Frontend stores:
   - `mediaContributorAuth: "true"`
   - `mediaContributorEmail: user@email.com`
   - `mediaContributorUser: {user object}`
   - `mediaContributorExpiry: timestamp (1 hour)`
7. User redirected to media contribution page

### Session Management
- Sessions stored in localStorage
- 1-hour expiration time
- User data accessible across pages
- Automatic logout after expiration

## Testing the System

### 1. Start the Backend Server
```bash
cd backend
node server.js
```
You should see:
```
✅ Backend server running on http://localhost:5000
📝 Bookings stored in: [...]/backend/bookings.json
🔐 Auth API available at /api/auth/*
```

### 2. Start the Frontend
```bash
cd sih-website
npm run dev
```

### 3. Test Registration
1. Navigate to: `http://localhost:3000/media-contribution/register`
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: password123
   - Confirm Password: password123
   - ✓ Agree to terms
3. Click "Create Account"
4. You should see "Registration successful! Redirecting to login..."
5. You'll be redirected to the login page

### 4. Test Login
1. On the login page, enter:
   - Email: john@example.com
   - Password: password123
2. Click "Login"
3. You should be redirected to the media contribution page
4. Your session is now active

### 5. Verify Storage
Check `backend/users.json` to see your registered user:
```json
[
  {
    "id": "unique-hex-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "hashed-password",
    "phone": "9876543210",
    "registeredAt": "2024-12-09T..."
  }
]
```

## API Endpoints

### Register User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "registeredAt": "..."
  }
}
```

### Login User
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "registeredAt": "..."
  }
}
```

### Verify User
```http
POST http://localhost:5000/api/auth/verify
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using SHA-256 before storage
2. **No Plain Text Passwords**: Passwords never returned in API responses
3. **Duplicate Prevention**: Email uniqueness enforced
4. **Input Validation**: Both frontend and backend validation
5. **Session Expiration**: 1-hour automatic logout

## Files Changed

### New Files
- `backend/users.json` - User database
- `AUTH_SYSTEM_GUIDE.md` - This documentation

### Modified Files
- `backend/routes/auth.js` - Complete rewrite with new auth endpoints
- `backend/server.js` - Added auth routes mounting
- `sih-website/app/media-contribution/register/page.tsx` - API integration
- `sih-website/app/media-contribution/login/page.tsx` - API integration

## Next Steps (Optional Enhancements)

1. **Add JWT Tokens** for more secure session management
2. **Email Verification** with OTP
3. **Password Reset** functionality
4. **Profile Management** page
5. **Admin Dashboard** to manage users
6. **Rate Limiting** to prevent brute force attacks
7. **Use bcrypt** instead of SHA-256 for better password security
8. **MongoDB Integration** instead of JSON file storage
9. **HTTPS** for production
10. **Environment Variables** for sensitive configuration

## Troubleshooting

### Backend not starting
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`
- Check for missing dependencies: `npm install`

### Registration fails
- Check backend console for errors
- Verify `users.json` file exists and is writable
- Check network tab in browser for API errors

### Login fails with correct credentials
- Clear localStorage: `localStorage.clear()`
- Check if password was hashed correctly during registration
- Verify user exists in `users.json`

### Session not persisting
- Check if localStorage is enabled in browser
- Verify session expiry time hasn't passed
- Check for JavaScript errors in console

## Support

For issues or questions:
1. Check backend console logs
2. Check browser console for errors
3. Verify API endpoints are accessible: `http://localhost:5000/health`
4. Review `users.json` for data consistency

---

**System Status**: ✅ Fully Operational
**Last Updated**: December 9, 2024
**Version**: 1.0.0
