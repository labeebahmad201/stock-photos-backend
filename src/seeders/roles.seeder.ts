/* eslint-disable @typescript-eslint/camelcase */

import Role from '../models/role.model';

export default async function() {
  let AlreadyPresentRoles = await Role.find({});
  console.log('AlreadyPresentRoles', AlreadyPresentRoles);
  if (AlreadyPresentRoles.length > 0) {
    return;
  }

  const roles = [{ name: 'Admin' }, { name: 'Seller' }, { name: 'Buyer' }];

  Role.insertMany(roles)
    .then(r => {
      console.log('done seeding roles', r);
    })
    .catch(e => {
      console.log('roles seeding failed');
    });
}
