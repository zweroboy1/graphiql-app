import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import { TextField } from '../../components/inputs/TextField';
import { PasswordField } from '../../components/inputs/PasswordField';
import { registerSchema } from '../../schemas';

export const Register: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(registerSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    setSubmiting(true);
    setError(null);
    try {
      await registerUser(data);
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
        <h2 className="login-form__title h2">Sign up</h2>
        <TextField
          id="name"
          type="text"
          label="Name"
          placeholder="Your name"
          autocomplete="name"
          register={register}
          error={errors['name']}
        />
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
          className={submiting ? 'button button_loading' : 'button'}
          disabled={!isValid || submiting}
          type="submit"
          role="submit"
        >
          <span>Register</span>
        </button>
        {error && <div>{error}</div>}

        <div className="login-form__text text">
          Already have an account?
          <br />
          <Link to="/login">Sign In</Link>
        </div>
      </form>
    </>
  );
};
