# Testing 2FA Authentication

## Prerequisites
- Server running on http://localhost:3000
- MongoDB connected
- At least one admin user in database

## Step-by-Step Testing Guide

### 1. **Test Login (without 2FA enabled)**
```bash
# Login with admin credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"yourpassword\"}"
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Admin Name",
    "email": "admin@example.com",
    "role": "superadmin"
  }
}
```
✅ Check: `admin_token` cookie is set in browser/response headers

---

### 2. **Test 2FA Setup** (must be logged in)
```bash
# Get 2FA QR code
curl -X POST http://localhost:3000/api/auth/2fa/setup \
  -H "Cookie: admin_token=YOUR_JWT_TOKEN"
```

**Expected response:**
```json
{
  "success": true,
  "qr": "data:image/png;base64,..."
}
```

✅ Action: 
- Copy the QR data URL and open in browser (or use a QR decoder)
- Scan with Google Authenticator / Authy / Any TOTP app
- App will show 6-digit codes rotating every 30 seconds

---

### 3. **Test 2FA Verification (Setup)**
```bash
# Verify the TOTP code to enable 2FA
curl -X POST http://localhost:3000/api/auth/2fa/verify \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_JWT_TOKEN" \
  -d "{\"code\":\"123456\",\"action\":\"setup\"}"
```

**Expected response:**
```json
{
  "success": true
}
```

✅ Check: Admin's `is2FAEnabled` field is now `true` in database

---

### 4. **Test Login (with 2FA enabled)**
```bash
# Step 1: Login with credentials
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"yourpassword\"}"
```

**Expected response:**
```json
{
  "success": true,
  "needs2FA": true,
  "data": {...}
}
```
✅ Check: `admin_2fa_temp` cookie is set (expires in 5 minutes)
✅ Check: No `admin_token` cookie yet

```bash
# Step 2: Verify TOTP code
curl -X POST http://localhost:3000/api/auth/2fa/verify \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_2fa_temp=TEMP_TOKEN" \
  -d "{\"code\":\"123456\",\"action\":\"login\"}"
```

**Expected response:**
```json
{
  "success": true
}
```
✅ Check: `admin_token` cookie is now set (expires in 7 days)
✅ Check: `admin_2fa_temp` cookie is cleared

---

### 5. **Test Protected Routes**

#### Without token:
```bash
# Try to access protected admin page
curl http://localhost:3000/admin/dashboard
```
**Expected:** Redirect to `/admin` (login page)

#### With valid token:
```bash
curl http://localhost:3000/admin/dashboard \
  -H "Cookie: admin_token=YOUR_JWT_TOKEN"
```
**Expected:** Page loads successfully (or API returns 200)

#### With invalid/expired token:
```bash
curl http://localhost:3000/admin/dashboard \
  -H "Cookie: admin_token=invalid_token"
```
**Expected:** Redirect to `/admin` (middleware allows through, but server components/APIs will reject)

---

## Browser Testing (Easiest Method)

### Using Browser DevTools:

1. **Open http://localhost:3000/admin**
2. **Login** with admin credentials
3. Open DevTools → Network tab
4. Check login response:
   - If `needs2FA: true`, enter TOTP code when prompted
   - If no 2FA, you're logged in directly
5. **Test protected route**: Navigate to http://localhost:3000/admin/dashboard
   - Should load if authenticated
   - Should redirect to `/admin` if not authenticated
6. **Clear cookies** and try accessing dashboard again → should redirect

### Setup 2FA via Browser:

1. Login at `/admin`
2. Navigate to settings/profile (wherever you add the 2FA UI)
3. Click "Enable 2FA" → calls `/api/auth/2fa/setup`
4. Scan QR code with authenticator app
5. Enter 6-digit code → calls `/api/auth/2fa/verify` with `action: "setup"`
6. Logout and login again → should now require TOTP code

---

## Quick Verification Checklist

- ✅ `npm install` completed without errors
- ✅ Server starts on http://localhost:3000
- ✅ MongoDB connection working
- ✅ Login API returns JWT token
- ✅ 2FA setup generates QR code
- ✅ TOTP verification enables 2FA
- ✅ Login with 2FA requires TOTP code
- ✅ Protected routes redirect without token
- ✅ Protected routes accessible with valid token
- ✅ Middleware protects `/admin/dashboard`, `/admin/monasteries`, etc.

---

## Common Issues & Fixes

**Issue:** "Authentication failed" when calling protected endpoints
- **Fix:** Make sure `admin_token` cookie is being sent with requests

**Issue:** "Invalid code" during TOTP verification
- **Fix:** Ensure system time is synced (TOTP is time-based)

**Issue:** QR code doesn't scan
- **Fix:** Copy the `data:image/png;base64,...` URL and paste directly in browser address bar

**Issue:** Middleware not redirecting
- **Fix:** Check that route matches patterns in `middleware.ts` config

**Issue:** JWT_SECRET not set
- **Fix:** Create `.env.local` file:
  ```
  JWT_SECRET=your-super-secret-key-here-change-in-production
  MONGODB_URI=your-mongodb-connection-string
  ```

---

## What's Protected

These routes require authentication (will redirect to `/admin` if no token):
- `/admin/dashboard`
- `/admin/contributors`
- `/admin/media`
- `/admin/monasteries`
- `/admin/settings`
- `/admin/submissions`

The `/admin` route itself is **not** protected (it's the login page).
