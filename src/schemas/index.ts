import * as yup from 'yup';

const loginSchemaShape = {
  email: yup
    .string()
    .required('EmailIsRequired')
    .email('EmailMustBeValid')
    .matches(/\.[a-z]{2,}$/, 'MustContainDomain'),
  password: yup
    .string()
    .required('PasswordIsRequired')
    .min(8, 'AtLeast8Characters')
    .matches(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/, 'MustHaveSpecial')
    .matches(/\p{Lu}/u, 'MustHaveUppercased')
    .matches(/\p{Ll}/u, 'MustHaveLowered')
    .matches(/[0-9]+/, 'MustHaveNumber'),
};

const registerSchemaShape = {
  name: yup
    .string()
    .required('NameIsRequired')
    .matches(/^[\p{L}\s.-]+$/u, 'OnlyLetters'),
  ...loginSchemaShape,
};

const urlSchemaShape = {
  endpoint: yup.string().required('UrlIsRequired').url('InvalidUrlFormat'),
};

export const loginSchema = yup.object().shape(loginSchemaShape);
export const registerSchema = yup.object().shape(registerSchemaShape);
export const urlSchema = yup.object().shape(urlSchemaShape);
