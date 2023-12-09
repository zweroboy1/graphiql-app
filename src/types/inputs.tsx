import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

export interface TextFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}
