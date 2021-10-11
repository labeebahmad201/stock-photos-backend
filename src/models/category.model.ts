/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/ban-types */

import mongoose from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const CategoryModel = mongoose.model<CategoryDocument>(
  'Category',
  CategorySchema,
);

export default CategoryModel;
