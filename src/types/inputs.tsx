import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  // UseFormRegister,
} from 'react-hook-form';

export type AutocompleteType = 'off' | 'username' | 'current-password';
export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  autocomplete: AutocompleteType;
  register: unknown;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}

export interface TextFieldProps extends PasswordFieldProps {
  type: string;
  icon?: { component: React.FC; onClick?: () => void };
}
