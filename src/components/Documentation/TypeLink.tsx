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
      const a =
        type.kind === 'NON_NULL'
          ? `${renderType(type.ofType)}!`
          : `[${renderType(type.ofType)}]`;

      const allTypes =
        typeName + (typeof type.ofType === 'string' ? type.ofType : a);
      return allTypes;
    } else {
      return typeName;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    const cleanedType = renderType(type).replace(/[[\]!]/g, '');
    dispatch(setActiveType(cleanedType));
  };

  return (
    <span
      className="docs__link"
      onClick={() => {
        handleClick();
      }}
    >
      {renderType(type)}
    </span>
  );
};
