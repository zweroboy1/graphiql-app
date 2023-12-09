import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}

export interface TextFieldProps extends PasswordFieldProps {
  type: string;
  icon?: { SvgComponent: React.FC; onClick?: () => void };
}
