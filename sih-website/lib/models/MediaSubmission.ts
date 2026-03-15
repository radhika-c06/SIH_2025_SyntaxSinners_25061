import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMediaSubmission extends Document {
  title: string;
  monasteryName: string;
  contributorName?: string;
  contributorEmail?: string;
  type: string;
  description?: string;
  location?: string;
  tags: string[];
  mediaFiles: any[];
  ocrData?: any;
  status: 'pending' | 'approved' | 'rejected';
  submittedOn?: string;
  createdAt: Date;
}

const mediaSubmissionSchema = new Schema<IMediaSubmission>(
  {
    title: { type: String, required: true, trim: true },
    monasteryName: { type: String, required: true, trim: true },
    contributorName: { type: String, default: 'Anonymous' },
    contributorEmail: { type: String, default: '' },
    type: { type: String, default: 'media' },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    tags: { type: [String], default: [] },
    mediaFiles: { type: Schema.Types.Mixed, default: [] },
    ocrData: { type: Schema.Types.Mixed, default: null },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    submittedOn: { type: String },
  },
  { timestamps: true }
);

export const MediaSubmission: Model<IMediaSubmission> =
  mongoose.models.MediaSubmission ||
  mongoose.model<IMediaSubmission>('MediaSubmission', mediaSubmissionSchema);
