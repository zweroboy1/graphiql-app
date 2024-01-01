import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextFieldProps } from '../../types/inputs';
import { useLocalization } from '../../contexts/locale.context';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  autocomplete,
  register,
  error,
  icon,
  defaultValue,
}) => {
  const { t } = useLocalization();
  let inputClasses = error ? 'input input_error' : 'input';
  inputClasses = icon ? `${inputClasses} input_eye` : inputClasses;
  return (
    <div className="input__group">
      <label className="h4" htmlFor={id}>
        {label}
      </label>
      <div className="input__container">
        <input
          className={inputClasses}
          type={type}
          id={id}
          role={id}
          placeholder={placeholder}
          autoComplete={autocomplete}
          defaultValue={defaultValue}
          {...(register as UseFormRegister<FieldValues>)(id)}
        />
        {icon && (
          <button className="input__icon" type="button" onClick={icon.onClick}>
            <icon.component />
          </button>
        )}
      </div>
      {error && (
        <div className="input-error-message">{t[String(error.message)]}</div>
      )}
    </div>
  );
};
