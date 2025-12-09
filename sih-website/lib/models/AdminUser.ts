/**
 * AdminUser Model
 * Schema for admin users with role-based access control
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  // TOTP secret (if 2FA enabled or in setup). Hidden by default on queries.
  totpSecret?: string;
  // Whether the admin has enabled 2-factor authentication
  is2FAEnabled?: boolean;
  role: 'superadmin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<IAdminUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      minlength: 6,
      select: false, // Don't include by default in queries
    },
    totpSecret: {
      type: String,
      select: false,
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['superadmin', 'editor'],
      default: 'editor',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>('AdminUser', adminUserSchema);
