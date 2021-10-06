/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface RoleDocument extends mongoose.Document {
  name: string;

  created_at: string;
  updated_at: string;
}

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: String, default: Date.now },
  updated_at: { type: String, default: Date.now },
});

const RoleModel = mongoose.model<RoleDocument>('Role', RoleSchema);

export default RoleModel;
