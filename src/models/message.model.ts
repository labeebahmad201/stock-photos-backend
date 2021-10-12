/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface MessageDocument extends mongoose.Document {
  text: string;
  to : mongoose.Schema.Types.ObjectId;
  from : mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
