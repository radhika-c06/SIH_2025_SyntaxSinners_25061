import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOcrRecord extends Document {
  title: string;
  language?: string;
  capturedOn?: string;
  location: string;
  monasteryName: string;
  description?: string;
  tags: string[];
  rawText?: string;
  cleanedText: string;
  imageData?: string;
  contributorName?: string;
  contributorEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const ocrRecordSchema = new Schema<IOcrRecord>(
  {
    title: { type: String, required: true, trim: true },
    language: { type: String },
    capturedOn: { type: String },
    location: { type: String, required: true, trim: true },
    monasteryName: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] },
    rawText: { type: String },
    cleanedText: { type: String, required: true },
    imageData: { type: String },
    contributorName: { type: String, default: 'Anonymous' },
    contributorEmail: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export const OcrRecord: Model<IOcrRecord> =
  mongoose.models.OcrRecord || mongoose.model<IOcrRecord>('OcrRecord', ocrRecordSchema);
