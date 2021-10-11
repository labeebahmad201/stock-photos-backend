/* eslint-disable @typescript-eslint/camelcase */

import Category from '../models/category.model';

export default async function() {
  const AlreadyPresentRecords = await Category.find({});
  if (AlreadyPresentRecords.length > 0) {
    return;
  }

  const now = new Date().toISOString();
  const categories = [
    {
      name: '3D',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Artwork',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Editorial',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Free',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Mockup',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Premium',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Templates',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Videos',
      created_at: now,
      updated_at: now,
    },
  ];

  Category.insertMany(categories)
    .then(r => {
      console.log('done seeding categories', r);
    })
    .catch(e => {
      console.log('categories seeding failed');
    });
}
