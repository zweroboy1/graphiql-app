import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/inputs/TextFiled';

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
    </div>
  );
};
