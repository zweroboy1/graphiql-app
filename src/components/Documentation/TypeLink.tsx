import { useDispatch } from 'react-redux';
import { Type } from '../../types/types';
import { setActiveType } from '../../store/slices/activeTypeSlice';

interface TypeButtonProps {
  type: Type;
}

export const TypeLink: React.FC<TypeButtonProps> = ({ type }) => {
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
  return (
    <a
      href="#"
      onClick={() => {
        dispatch(setActiveType(renderType(type)));
      }}
    >
      {renderType(type)}
    </a>
  );
};
