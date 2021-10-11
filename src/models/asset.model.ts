/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface AssetDocument extends mongoose.Document {
  name: string;
  description: string;
  is_approved: boolean;
  type: 'freebie' | 'stock_image_or_video';
  cover_image: string;
  bundle_ref: string;
  collection_ref: mongoose.Schema.Types.ObjectId;

  created_at: Date;
  updated_at: Date;
}

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  is_approved: { type: Boolean, required: true, default: false },
  type: {
    type: String,
    required: true,
    enum: ['freebie', 'stock_image_or_video'],
  },
  cover_image: { type: String, required: true },
  bundle_ref: { type: String, required: true },
  collection_ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Asset', AssetSchema);
