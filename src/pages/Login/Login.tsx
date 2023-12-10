import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginUser } from '../../services/auth';

import { TextField } from '../../components/inputs/TextField';
import { PasswordField } from '../../components/inputs/PasswordField';

import { loginSchema } from '../../schemas';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(loginSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { email: string; password: string }) => {
    setSubmiting(true);
    setError(null);
    try {
      await loginUser(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <>
    <h2 className="h2">Login form</h2>
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>      
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
      <button className="button" disabled={submiting} type="submit" role="submit">
        Login
      </button>
      {false && error && <div>{error}</div>}
    </form>
    </>
  );
};
