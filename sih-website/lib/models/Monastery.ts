/**
 * Monastery Model
 * Schema for published monastery pages on the website
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISection {
  key: string;
  title: string;
  content: string;
}

export interface IMonastery extends Document {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  location: string;
  district?: string;
  altitude?: string;
  founded: string;
  shortDescription: string;
  heroImageUrl: string;
  gallery: string[];
  sections: ISection[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const monasterySchema = new Schema<IMonastery>(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'],
    },
    name: {
      type: String,
      required: [true, 'Monastery name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    altitude: {
      type: String,
      trim: true,
    },
    founded: {
      type: String,
      required: [true, 'Founded year/date is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
    },
    heroImageUrl: {
      type: String,
      required: [true, 'Hero image URL is required'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    sections: {
      type: [
        {
          key: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster slug lookups
monasterySchema.index({ slug: 1 });
monasterySchema.index({ isPublished: 1 });

// Prevent model recompilation in development
export const Monastery: Model<IMonastery> =
  mongoose.models.Monastery ||
  mongoose.model<IMonastery>('Monastery', monasterySchema);
