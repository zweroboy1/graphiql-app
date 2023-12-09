import { TextFieldProps } from '../../types/inputs';

export const TextField: React.FC<TextFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  register,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} {...register(id)} />
    </>
  );
};
