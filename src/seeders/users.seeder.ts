/* eslint-disable @typescript-eslint/camelcase */

import User from '../models/user.model';

export default function() {
  console.log('user seeder has started');

  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: 1,
      firstname: 'test',
      lastname: 'test',
      email: 'test@testmai.com',
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }

  User.insertMany(users)
    .then(r => {
      console.log('done seeding users', r);
    })
    .catch(e => {
      console.log('users seeding failed');
    });
}
