import * as yup from 'yup';
import Country from './../models/country.model';

export default {
    country_code: yup
    .string()
    .required()
    .test({
      name: 'exists',
      message: 'Invalid ${path} provided',
      test: async function(countryCode) {
        const country = await Country.findOne({
          code: countryCode.toUpperCase(),
        });

        if (country) {
          return true;
        }

        return false;
      },
    }),
};
