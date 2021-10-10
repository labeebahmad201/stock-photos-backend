/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';
import countriesData from '../data/countries.data';
import maxLengthRule from '../rules/maxLength.rule';

const countryCodesArr: string[] = [];

countriesData.forEach(country => {
  countryCodesArr.push(country.code);
});

export default {
  email: maxLengthRule(yup.string().required(), 100),
  firstname: maxLengthRule(yup.string().required(), 100),
  lastname: maxLengthRule(yup.string().required(), 100),
  phone: maxLengthRule(yup.string().required(), 100),
  country_code: yup
    .string()
    .oneOf(countryCodesArr)
    .required(),
  zip_code: maxLengthRule(yup.string().required(), 100),
  city: maxLengthRule(yup.string().required(), 100),
  company_name: maxLengthRule(yup.string(), 100),
  type: yup.string().oneOf(['billing', 'shipping']),
};
