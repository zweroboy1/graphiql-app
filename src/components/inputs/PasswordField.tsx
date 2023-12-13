import { useState } from 'react';
import { TextField } from './TextField';
import { EyeOffSVG, EyeOnSVG } from '../../shared/svg';
import { PasswordFieldProps } from '../../types/inputs';

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  placeholder,
  autocomplete,
  register,
  error,
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
        autocomplete={autocomplete}
        register={register}
        error={error}
        icon={{
          component: passwordType === 'password' ? EyeOffSVG : EyeOnSVG,
          onClick: toggleVisibilityPassword,
        }}
      />
    </>
  );
};
