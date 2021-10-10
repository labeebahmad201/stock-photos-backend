/* eslint-disable @typescript-eslint/camelcase */

import State from '../models/state.model';
import statesData from '../data/states.data';

export default async function() {
  const AlreadyPresentRecords = await State.find({});
  if (AlreadyPresentRecords.length > 0) {
    return;
  }

  const states = [];
  statesData.forEach(state => {
    states.push({
      name: state.name,
      country_code: state.country_code,
      code: state.state_code,
    });
  });

  State.insertMany(states)
    .then(r => {
      console.log('done seeding states', r);
    })
    .catch(e => {
      console.log('states seeding failed');
    });
}
