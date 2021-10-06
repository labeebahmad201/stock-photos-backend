/* eslint-disable @typescript-eslint/camelcase */

import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  username: String;
  email: String;
  firstname: String;
  lastname: String;
  password: String;
  phone: String;

  created_at: Date;
  updated_at: Date;
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
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
