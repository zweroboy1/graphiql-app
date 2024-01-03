import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalization } from '../../contexts/locale.context';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/auth';
import { TextField } from '../../components/inputs/TextField';
import { PasswordField } from '../../components/inputs/PasswordField';
import { loginSchema } from '../../schemas';
import { getErrorText } from '../../utils/getErrorText';

export const Login: React.FC = () => {
  const { t, language } = useLocalization();
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
      const toastText = getErrorText(errorCode, language);
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
      <form
        className="login-form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="login"
      >
        <h2 className="login-form__title h2">{t.SignIn}</h2>
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
          className={submiting ? 'button button_loading' : 'button'}
          disabled={!isValid || submiting || buttonDisabled}
          type="submit"
          role="submit"
        >
          <span>{t.Login}</span>
        </button>

        <div className="login-form__text text">
          {t.NoAccountYet}
          <br />
          <Link to="/register">{t.SignUp}</Link>
        </div>
      </form>
    </>
  );
};
