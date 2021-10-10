/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';
import Country from './country.model';

export interface AddressDocument extends mongoose.Document {
  firstname: string;
  lastname: string;
  company_name?: string;
  country: any;
  street_address: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  type: 'billing' | 'shipping';
  user: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const addressSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  company_name: { type: String },
  country: { type: Country, required: true },
  street_address: { type: String, required: true },
  city: { type: String, required: true },
  zip_code: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Address', addressSchema);
