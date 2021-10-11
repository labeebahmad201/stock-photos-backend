/* eslint-disable @typescript-eslint/camelcase */

import Collection from '../models/collection.model';

export default async function() {
  const AlreadyPresentRecords = await Collection.find({});
  if (AlreadyPresentRecords.length > 0) {
    return;
  }

  const now = new Date().toISOString();
  const collections = [
    {
      name: 'Food',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Summer',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Home & Interiors',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'City',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Cars',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Woman',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Nature & Travel',
      created_at: now,
      updated_at: now,
    },
    {
      name: 'Lifestyle & fashion',
      created_at: now,
      updated_at: now,
    },
  ];

  Collection.insertMany(collections)
    .then(r => {
      console.log('done seeding collections', r);
    })
    .catch(e => {
      console.log('collections seeding failed');
    });
}
