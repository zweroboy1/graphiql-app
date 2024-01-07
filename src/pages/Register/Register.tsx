import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalization } from '../../contexts/locale.context';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/auth';
import { TextField } from '../../components/inputs/TextField';
import { PasswordField } from '../../components/inputs/PasswordField';
import { registerSchema } from '../../schemas';
import { getErrorText } from '../../utils/getErrorText';

import 'react-toastify/dist/ReactToastify.css';

export const Register: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(registerSchema) });
  const [submiting, setSubmiting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const { t, language } = useLocalization();

  const onSubmit = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    setSubmiting(true);
    try {
      await registerUser(data);
      navigate('.');
    } catch (e) {
      const errorCode = e instanceof Error ? e.message : null;
      const toastText = getErrorText(errorCode, language);
      setButtonDisabled(true);
      toast.error(toastText, {
        toastId: 'toast',
        className: 'toast-error',
      });
    } finally {
      setSubmiting(false);
    }
  };

  useEffect(() => {
    toast.onChange((v) => {
      if (v.status === 'removed') {
        setButtonDisabled(false);
      }
    });
  }, []);

  return (
    <>
      <form
        className="login-form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="register"
      >
        <h2 className="login-form__title h2">{t.SignUp}</h2>
        <TextField
          id="name"
          type="text"
          label={t.Name}
          placeholder={t.YourName}
          autocomplete="name"
          register={register}
          error={errors['name']}
        />
        <TextField
          id="email"
          type="email"
          label={t.Email}
          placeholder="name@example.com"
          autocomplete="username"
          register={register}
          error={errors['email']}
        />
        <PasswordField
          id="password"
          label={t.Password}
          placeholder={t.PasswordPlaceholder}
          autocomplete="current-password"
          register={register}
          error={errors['password']}
        />
        <button
          className={`button button_bigger${
            submiting ? ' button_loading' : ''
          }`}
          disabled={!isValid || submiting || buttonDisabled}
          type="submit"
          role="submit"
        >
          <span>{t.Register}</span>
        </button>

        <div className="login-form__text text">
          {t.AlreadyHaveAccount}
          <br />
          <Link to="/login">{t.SignIn}</Link>
        </div>
      </form>
    </>
  );
};
