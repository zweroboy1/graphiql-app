import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextFieldProps } from '../../types/inputs';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  register,
  error,
  icon,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative', width: 'max-content' }}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...(register as UseFormRegister<FieldValues>)(id)}
        />
        {icon && (
          <button
            style={{ position: 'absolute', top: '2px', right: '2px' }}
            type="button"
            onClick={icon.onClick}
          >
            <icon.SvgComponent />
          </button>
        )}
      </div>
      {error && <div>{error.message as string}</div>}
    </>
  );
};
