/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export default {
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  new_password: yup.string().required(),
  password_confirmation: yup
    .string()
    .oneOf([
      yup.ref('new_password'),
      'New Password & Password Confirmation must be same',
    ])
    .required(),
};
