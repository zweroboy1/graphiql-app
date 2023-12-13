import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
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
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="login-form__title h2">Sign in</h2>
        <TextField
          id="email"
          type="email"
          label="Email"
          placeholder="name@example.com"
          autocomplete="username"
          register={register}
          error={errors['email']}
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Enter your password"
          autocomplete="current-password"
          register={register}
          error={errors['password']}
        />
        <button
          className="button"
          disabled={submiting}
          type="submit"
          role="submit"
        >
          Login
        </button>
        {false && error && <div>{error}</div>}

        <div className="login-form__text text">
          Do not have an account yet?
          <br />
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </>
  );
};
