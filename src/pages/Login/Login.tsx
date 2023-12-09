import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from '../../components/inputs/TextFiled';
import { PasswordField } from '../../components/inputs/PasswordField';

import { loginSchema } from '../../schemas';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit(console.log)}>
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
      <button type="submit">Log in</button>
    </form>
  );
};
