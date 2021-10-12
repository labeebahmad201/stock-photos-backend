/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface ConversationDocument extends mongoose.Document {
    to: mongoose.Schema.Types.ObjectId,
    from: mongoose.Schema.Types.ObjectId,

    created_at: Date;
    updated_at: Date;
}

const ConversationSchema = new mongoose.Schema({
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export default mongoose.model('Conversation', ConversationSchema);
