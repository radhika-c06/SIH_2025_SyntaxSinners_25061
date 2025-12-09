/**
 * Check if admin exists in database
 * Run: node scripts/check-admin.js
 */

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sih-website';

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  is2FAEnabled: { type: Boolean, default: false },
}, { timestamps: true });

const Admin = mongoose.models.AdminUser || mongoose.model('AdminUser', adminSchema);

async function checkAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const admins = await Admin.find({});
    
    if (admins.length === 0) {
      console.log('❌ No admin users found in database!');
      console.log('Run: node scripts/create-admin-simple.js');
    } else {
      console.log(`Found ${admins.length} admin user(s):\n`);
      admins.forEach((admin, i) => {
        console.log(`${i + 1}. Email: ${admin.email}`);
        console.log(`   Name: ${admin.name}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   2FA: ${admin.is2FAEnabled ? 'Enabled' : 'Disabled'}`);
        console.log(`   Created: ${admin.createdAt}`);
        console.log('');
      });
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

checkAdmin();
