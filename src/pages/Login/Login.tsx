import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/inputs/TextFiled';
import { PasswordField } from '../../components/inputs/PasswordField';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <TextField
        id="email"
        type="email"
        label="Email:"
        placeholder="name@example.com"
        register={register}
        error={errors['email']}
      />
      <PasswordField
        id="password"
        label="Password:"
        placeholder="Enter your password"
        register={register}
        error={errors['password']}
      />
    </div>
  );
};
