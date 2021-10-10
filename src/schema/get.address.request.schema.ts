import * as yup from 'yup';

export default {
  type: yup.string().oneOf(['billing', 'shipping']),
};
