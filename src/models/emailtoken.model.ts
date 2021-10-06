/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface EmailTokenDocument extends mongoose.Document {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const EmailTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const EmailModel = mongoose.model<EmailTokenDocument>(
  'EmailToken',
  EmailTokenSchema,
);

export default EmailModel;
