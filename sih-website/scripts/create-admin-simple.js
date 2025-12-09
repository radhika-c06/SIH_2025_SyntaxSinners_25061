/**
 * Quick admin creation script using MongoDB connection
 * Run: node scripts/create-admin-simple.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sih-website';

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  is2FAEnabled: { type: Boolean, default: false },
}, { timestamps: true });

const Admin = mongoose.models.AdminUser || mongoose.model('AdminUser', adminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'admin@example.com';
    const password = 'Admin@123'; // Change this!
    const name = 'Super Admin';
    const role = 'superadmin';

    // Check if admin exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('❌ Admin already exists with email:', email);
      await mongoose.disconnect();
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    await Admin.create({
      name,
      email,
      passwordHash,
      role,
      is2FAEnabled: false,
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('=================================');
    console.log('LOGIN CREDENTIALS:');
    console.log('=================================');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    console.log('=================================\n');
    console.log('⚠️  Use these credentials to login at http://localhost:3000/admin\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createAdmin();
