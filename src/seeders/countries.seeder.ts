/* eslint-disable @typescript-eslint/camelcase */

import Country from '../models/country.model';
import CountriesData from './../data/countries.data';

export default async function() {
  const AlreadyPresentRecords = await Country.find({});
  if (AlreadyPresentRecords.length > 0) {
    return;
  }

  const countries = [];

  const now = new Date().toISOString();
  CountriesData.forEach(country => {
    countries.push({
      name: country.name,
      code: country.code,
      created_at: now,
      updated_at: now,
    });
  });

  Country.insertMany(countries)
    .then(r => {
      console.log('done seeding countries', r);
    })
    .catch(e => {
      console.log('coutries seeding failed');
    });
}
