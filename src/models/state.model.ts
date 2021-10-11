/* eslint-disable @typescript-eslint/camelcase */
import mongoose from 'mongoose';

export interface StateDocument extends mongoose.Document {
  name: string;
  country_code: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

export const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country_code: { type: String, required: true },
  code: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('State', stateSchema);
