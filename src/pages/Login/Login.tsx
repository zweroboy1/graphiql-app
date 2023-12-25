import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/auth';
import { TextField } from '../../components/inputs/TextField';
import { PasswordField } from '../../components/inputs/PasswordField';
import { loginSchema } from '../../schemas';
import { getErrorText } from '../../utils/getErrorText';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(loginSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setSubmiting(true);
    try {
      await loginUser(data);
    } catch (e) {
      const errorCode = e instanceof Error ? e.message : null;
      const toastText = getErrorText(errorCode, 'en');
      setButtonDisabled(true);
      toast.error(toastText, {
        onClose: () => {
          setButtonDisabled(false);
        },
        className: 'toast-error',
      });
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
          className={submiting ? 'button button_loading' : 'button'}
          disabled={!isValid || submiting || buttonDisabled}
          type="submit"
          role="submit"
        >
          <span>Login</span>
        </button>

        <div className="login-form__text text">
          Do not have an account yet?
          <br />
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </>
  );
};
