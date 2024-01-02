import { useSelector, useDispatch } from 'react-redux';
import { setActiveType } from '../../store/slices/activeTypeSlice';
import { addToHistory } from '../../store/slices/history.slice';
import { Field } from '../../types/types';
import { RootState } from '../../store/store';
import { TypeLink } from './TypeLink';

interface TypeDetailsProps {
  el: Field;
}

export const TypeDetails: React.FC<TypeDetailsProps> = ({ el }) => {
  const activeType = useSelector((state: RootState) => state.type.name);
  const dispatch = useDispatch();

  const historyUpdate = (typeName: string) => {
    dispatch(addToHistory(activeType));
    dispatch(setActiveType(typeName));
  };

  return (
    <div>
      <div key={el.name}>
        <strong className="docs__subtitle">{el.name}</strong>
        {el.args && el.args.length > 0 && (
          <span className="docs__parenthesis"> (</span>
        )}
        {el.args &&
          el.args.map((arg, idx) => (
            <span key={arg.name} className="docs__param">
              {arg.name}:{' '}
              <TypeLink
                type={arg.type}
                onClick={() => historyUpdate(el.name)}
              />
              {el.args && idx < el.args.length - 1 && ', '}
            </span>
          ))}
        {el.args && el.args.length > 0 && (
          <span className="docs__parenthesis">)</span>
        )}
        {': '}
        {el.type && (
          <>
            <TypeLink type={el.type} onClick={() => historyUpdate(el.name)} />
            <div>{el.description}</div>
          </>
        )}
      </div>
    </div>
  );
};
