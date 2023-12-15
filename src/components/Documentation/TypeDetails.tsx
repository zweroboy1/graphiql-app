import { EnumValue, Field, InputField } from '../../types/types';
import { TypeLink } from './TypeLink';

interface TypeDetailsProps {
  el: Field | InputField | EnumValue;
}

export const TypeDetails: React.FC<TypeDetailsProps> = ({ el }) => {
  return (
    <div>
      <div key={el.name}>
        {el.name}
        {el.args && el.args.length > 0 && <span>( </span>}
        {el.args &&
          el.args.map((arg, idx) => (
            <span key={arg.name}>
              {arg.name}: <TypeLink type={arg.type} />
              {idx < el.args.length - 1 && ', '}
            </span>
          ))}
        {el.args && el.args.length > 0 && <span>)</span>}
        {' : '}
        {el.type && (
          <>
            <TypeLink type={el.type} />
            <div>{el.description}</div>
          </>
        )}
      </div>
    </div>
  );
};
