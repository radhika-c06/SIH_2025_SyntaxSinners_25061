/**
 * ContributorSubmission Model
 * Schema for pending monastery submissions from contributors
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContributorSubmission extends Document {
  _id: mongoose.Types.ObjectId;
  monasteryName: string;
  location: string;
  contributorName: string;
  contributorEmail: string;
  rawContent: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  reviewNotes?: string;
  linkedMonasteryId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const contributorSubmissionSchema = new Schema<IContributorSubmission>(
  {
    monasteryName: {
      type: String,
      required: [true, 'Monastery name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    contributorName: {
      type: String,
      required: [true, 'Contributor name is required'],
      trim: true,
    },
    contributorEmail: {
      type: String,
      required: [true, 'Contributor email is required'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    rawContent: {
      type: Schema.Types.Mixed,
      required: [true, 'Content is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    reviewNotes: {
      type: String,
      trim: true,
    },
    linkedMonasteryId: {
      type: Schema.Types.ObjectId,
      ref: 'Monastery',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster status lookups
contributorSubmissionSchema.index({ status: 1 });
contributorSubmissionSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
export const ContributorSubmission: Model<IContributorSubmission> =
  mongoose.models.ContributorSubmission ||
  mongoose.model<IContributorSubmission>(
    'ContributorSubmission',
    contributorSubmissionSchema
  );
