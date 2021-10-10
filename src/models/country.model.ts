/* eslint-disable @typescript-eslint/camelcase */
import mongoose from 'mongoose';

export interface CountryDocument extends mongoose.Document {
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Country', countrySchema);
