import * as yup from 'yup';

const loginSchemaShape = {
  email: yup
    .string()
    .required('email is required')
    .email()
    .matches(/\.[a-z]{2,}$/, 'email address must contain a domain'),
  password: yup
    .string()
    .required('password is required')
    .min(8)
    .matches(
      /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/,
      'password must have a special character'
    )
    .matches(/\p{Lu}/u, 'password must have one uppercased letter')
    .matches(/\p{Ll}/u, 'password must have one lowered letter')
    .matches(/[0-9]+/, 'password must have one number'),
};

const registerSchemaShape = {
  name: yup
    .string()
    .required('name is required')
    .matches(/^[\p{L}\s.-]+$/u, 'only letters are allowed'),
  ...loginSchemaShape,
};

export const loginSchema = yup.object().shape(loginSchemaShape);
export const registerSchema = yup.object().shape(registerSchemaShape);
