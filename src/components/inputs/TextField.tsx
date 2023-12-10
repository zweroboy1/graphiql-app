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

  const inputClasses = error ? 'input input_error' : 'input';
  return (
    <div className="input__group">
      <label className='h4' htmlFor={id}>{label}</label>
      <div className='input__container'>
        <input
        className= {inputClasses}
          type={type}
          id={id}
          placeholder={placeholder}
          {...(register as UseFormRegister<FieldValues>)(id)}
        />
        {icon && (
          <button
          className='input__icon'
            type="button"
            onClick={icon.onClick}
          >
            <icon.SvgComponent />
          </button>
        )}             
      </div>
      {error && <div className='input-error-message'>{error.message as string}</div>} 
      
    </div>
  );
};
