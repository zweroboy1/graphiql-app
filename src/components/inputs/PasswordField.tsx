import { useState } from 'react';

import { TextField } from './TextFiled';
import { EyeOffSVG, EyeOnSVG } from '../../shared/svg';

import { PasswordFieldProps } from '../../types/inputs';

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  placeholder,
  register,
}) => {
  const [passwordType, setPasswordType] = useState<'password' | 'text'>(
    'password'
  );
  const toggleVisibilityPassword = () => {
    passwordType === 'password'
      ? setPasswordType('text')
      : setPasswordType('password');
  };
  return (
    <>
      <TextField
        id={id}
        type={passwordType}
        label={label}
        placeholder={placeholder}
        register={register}
        icon={{
          SvgComponent: passwordType === 'password' ? EyeOffSVG : EyeOnSVG,
          onClick: toggleVisibilityPassword,
        }}
      />
    </>
  );
};
