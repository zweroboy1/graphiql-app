import { EnumValue, Field, InputField } from '../../types/types';
import { TypeLink } from './TypeLink';

interface TypeDetailsProps {
  el: Field | InputField | EnumValue;
  rootName: string | undefined;
}

export const TypeDetails: React.FC<TypeDetailsProps> = ({ el, rootName }) => {
  return (
    <div>
      <div key={el.name}>
        <div>{rootName}</div>
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
