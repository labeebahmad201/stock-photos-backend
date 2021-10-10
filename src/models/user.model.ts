/* eslint-disable @typescript-eslint/camelcase */

import mongoose from 'mongoose';
import Address from './address.model';

export interface UserDocument extends mongoose.Document {
  username: String;
  email: String;
  firstname: String;
  lastname: String;
  password: String;
  phone: String;
  created_at: Date;
  updated_at: Date;
  is_verified: Boolean;
  role: mongoose.Schema.Types.ObjectId;
  avatar_image?: String;
  cover_image?: String;
  biography?: String;
  addresses: [mongoose.Schema.Types.ObjectId];
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  is_verified: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  avatar_image: { type: String },
  cover_image: { type: String },
  biography: { type: String },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: Address.modelName }],
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
