import { useDispatch } from 'react-redux';
import { Type } from '../../types/types';
import { setActiveType } from '../../store/slices/activeTypeSlice';

interface TypeButtonProps {
  type: Type;
  onClick: () => void;
}

export const TypeLink: React.FC<TypeButtonProps> = ({ type, onClick }) => {
  const dispatch = useDispatch();

  const renderType = (type: Type): string => {
    const typeName = type.name || '';
    if (type.ofType) {
      return (
        typeName +
        (typeof type.ofType === 'string'
          ? type.ofType
          : renderType(type.ofType))
      );
    } else {
      return typeName;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    dispatch(setActiveType(renderType(type)));
  };

  return (
    <a
      href="#"
      onClick={() => {
        handleClick();
      }}
    >
      {renderType(type)}
    </a>
  );
};
