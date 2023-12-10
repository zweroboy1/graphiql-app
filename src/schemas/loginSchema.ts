import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('email is required')
    .email()
    .matches(/\.[a-z]{2,}$/, 'email address must contain a domain')
    .required(),
  password: yup
    .string()
    .required('password is required')
    .min(8)
    .matches(
      /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'password must have a special character'
    )
    .matches(/[A-Z]+/, 'password must have one uppercased letter')
    .matches(/[a-z]+/, 'password must have one lowered letter')
    .matches(/[0-9]+/, 'password must have one number'),
});
