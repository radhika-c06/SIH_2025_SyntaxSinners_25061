/**
 * Authentication Routes - Simplified Working Version
 * Handles user registration with OTP verification and eKYC
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// In-memory storage for OTP sessions (use Redis in production)
const otpSessions = new Map();

/**
 * Helper: Generate a random 6-digit OTP
 */
function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Helper: Create a session ID for OTP tracking
 */
function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Helper: Mask Aadhaar number (show last 4 digits only)
 */
function maskAadhaar(aadhaar) {
  return 'XXXX-XXXX-' + aadhaar.slice(-4);
}

/**
 * Helper: Mask phone number (show last 4 digits only)
 */
function maskPhone(phone) {
  return 'XXXXXX' + phone.slice(-4);
}

// ============================================================================
// POST /send-phone-otp
// ============================================================================

router.post('/send-phone-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Use 10-15 digits.',
      });
    }

    const otp = generateOTP();
    const sessionId = generateSessionId();

    otpSessions.set(sessionId, {
      type: 'phone',
      phone,
      otp,
      attempts: 0,
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    console.log(
      `[PHONE OTP] Masked: ${maskPhone(phone)} | OTP: ${otp} | Session: ${sessionId.slice(0, 8)}...`
    );

    res.json({
      success: true,
      sessionId,
      maskedPhone: maskPhone(phone),
      message: 'OTP sent successfully to your phone.',
      expiresIn: 600,
    });
  } catch (error) {
    console.error('[PHONE OTP ERROR]', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP. Please try again.',
    });
  }
});

// ============================================================================
// POST /verify-phone-otp
// ============================================================================

router.post('/verify-phone-otp', async (req, res) => {
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
