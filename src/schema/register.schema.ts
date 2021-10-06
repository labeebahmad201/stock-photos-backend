import * as yup from 'yup';

export default {
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  role: yup
    .mixed()
    .oneOf(['Seller', 'Buyer'])
    .required(),
};
