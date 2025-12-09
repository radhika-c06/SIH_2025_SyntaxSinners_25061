/**
 * Media Contributor Authentication Routes
 * Handles user registration and login for media contributors
 */

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const USERS_FILE = path.join(__dirname, '../users.json');

// Helper function to hash password
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper function to read users
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write users
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // Validation
    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Check if user already exists
    const users = await readUsers();
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    const newUser = {
      id: crypto.randomBytes(16).toString('hex'),
      fullName,
      email,
      password: hashPassword(password),
      phone,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ 
      success: true, 
      message: 'Registration successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again.' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const users = await readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Verify password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.json({ 
      success: true, 
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
});

// Verify user session (optional endpoint)
router.post('/verify', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const users = await readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({ 
      success: true, 
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
});

module.exports = router;

// OLD CODE REMOVED BELOW THIS LINE
router.post('/verify-phone-otp-OLD', async (req, res) => {
  try {
    const { sessionId, otp } = req.body;

    if (!sessionId || !otp) {
      return res.status(400).json({
        success: false,
        error: 'sessionId and otp are required.',
      });
    }

    const session = otpSessions.get(sessionId);

    if (!session) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired session. Please request OTP again.',
      });
    }

    if (Date.now() > session.expiresAt) {
      otpSessions.delete(sessionId);
      return res.status(400).json({
        success: false,
        error: 'OTP expired. Please request a new OTP.',
      });
    }

    if (session.attempts >= 5) {
      otpSessions.delete(sessionId);
      return res.status(429).json({
        success: false,
        error: 'Too many failed attempts. Please request OTP again.',
      });
    }

    if (session.otp !== otp) {
      session.attempts += 1;
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP. Please try again.',
        attemptsLeft: 5 - session.attempts,
      });
    }

    session.phoneVerified = true;
    session.verifiedAt = Date.now();

    console.log(`[PHONE VERIFIED] Phone: ${maskPhone(session.phone)}`);

    res.json({
      success: true,
      verified: true,
      phone: maskPhone(session.phone),
      message: 'Phone OTP verified successfully.',
    });
  } catch (error) {
    console.error('[VERIFY PHONE ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP.',
    });
  }
});

// ============================================================================
// POST /aadhaar-initiate
// ============================================================================

router.post('/aadhaar-initiate', async (req, res) => {
  try {
    const { sessionId, aadhaar } = req.body;

    if (!sessionId || !aadhaar) {
      return res.status(400).json({
        success: false,
        error: 'sessionId and aadhaar are required.',
      });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Aadhaar format. Must be 12 digits.',
      });
    }

    const session = otpSessions.get(sessionId);

    if (!session) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session. Please complete phone OTP verification first.',
      });
    }

    if (!session.phoneVerified) {
      return res.status(400).json({
        success: false,
        error: 'Phone verification required before Aadhaar verification.',
      });
    }

    console.log(
      `[AADHAAR INITIATE] Phone: ${maskPhone(session.phone)} | Aadhaar: ${maskAadhaar(aadhaar)}`
    );

    // Mock eKYC API call (in production, replace with real API)
    const referenceId = 'ekyc_ref_' + crypto.randomBytes(8).toString('hex');

    session.aadhaarInitiated = true;
    session.aadhaarMasked = maskAadhaar(aadhaar);
    session.aadhaarHash = crypto.createHash('sha256').update(aadhaar).digest('hex');
    session.eKycReferenceId = referenceId;
    session.aadhaarInitiatedAt = Date.now();

    res.json({
      success: true,
      referenceId,
      maskedAadhaar: maskAadhaar(aadhaar),
      message: 'Aadhaar OTP initiated. Check your phone linked to Aadhaar.',
      expiresIn: 600,
    });
  } catch (error) {
    console.error('[AADHAAR INITIATE ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate Aadhaar verification.',
    });
  }
});

// ============================================================================
// POST /aadhaar-verify
// ============================================================================

router.post('/aadhaar-verify', async (req, res) => {
  try {
    const { sessionId, referenceId, aadhaarOtp, userDetails } = req.body;

    if (!sessionId || !referenceId || !aadhaarOtp || !userDetails) {
      return res.status(400).json({
        success: false,
        error: 'All fields required: sessionId, referenceId, aadhaarOtp, userDetails',
      });
    }

    const { name, email } = userDetails;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'name and email are required in userDetails.',
      });
    }

    const session = otpSessions.get(sessionId);

    if (!session || !session.aadhaarInitiated) {
      return res.status(400).json({
        success: false,
        error: 'Invalid session or Aadhaar not initiated.',
      });
    }

    if (session.eKycReferenceId !== referenceId) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reference ID.',
      });
    }

    console.log(
      `[AADHAAR VERIFY] Phone: ${maskPhone(session.phone)} | Aadhaar: ${session.aadhaarMasked}`
    );

    // Mock eKYC verification (in production, replace with real API)
    const verifiedUserData = {
      id: 'user_' + crypto.randomBytes(8).toString('hex'),
      fullName: name,
      email,
      phone: session.phone,
      dateOfBirth: '1990-01-15',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      aadhaarVerified: true,
      aadhaarVerifiedAt: new Date(),
      eKycReferenceId: referenceId,
      createdAt: new Date(),
    };

    console.log(`[USER CREATED] ID: ${verifiedUserData.id} | Email: ${verifiedUserData.email}`);

    // Generate JWT token
    const token = Buffer.from(JSON.stringify({
      userId: verifiedUserData.id,
      email: verifiedUserData.email,
      role: 'media_contributor',
    })).toString('base64');

    // Clean up OTP session
    otpSessions.delete(sessionId);

    res.json({
      success: true,
      message: 'Registration successful!',
      user: {
        id: verifiedUserData.id,
        name: verifiedUserData.fullName,
        email: verifiedUserData.email,
        phone: maskPhone(verifiedUserData.phone),
        aadhaarVerified: verifiedUserData.aadhaarVerified,
      },
      token,
    });
  } catch (error) {
    console.error('[AADHAAR VERIFY ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify Aadhaar.',
    });
  }
});

module.exports = router;
