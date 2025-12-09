/**
 * Script to create an admin user
 * Run: npx ts-node scripts/create-admin.ts
 */

import { connectDB } from '../lib/db';
import { AdminUser } from '../lib/models/AdminUser';
import { hashPassword } from '../lib/auth/password';

async function createAdmin() {
  try {
    await connectDB();

    const email = 'admin@example.com';
    const password = 'Admin@123'; // Change this!
    const name = 'Super Admin';
    const role = 'superadmin';

    // Check if admin already exists
    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log('❌ Admin user already exists with email:', email);
      process.exit(1);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin
    const admin = await AdminUser.create({
      name,
      email,
      passwordHash,
      role,
    });

    console.log('✅ Admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
