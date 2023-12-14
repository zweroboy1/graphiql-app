import React from 'react';
import '../Schema/Schema.css';
import { OfType2, Type } from '../../types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const SchemasArgs: React.FC = () => {
  const schema = useSelector((state: RootState) => state.schemas.schema);
  const rootQuery =
    schema && schema.__schema.types.find((elem) => elem.name === 'Query');

  const renderType = (type: OfType2 | Type): React.ReactNode => {
    if (type.ofType) {
      return (
        <>
          {type.name}
          {typeof type.ofType === 'string'
            ? type.ofType
            : renderType(type.ofType)}
        </>
      );
    } else {
      return type.name;
    }
  };

  return (
    <>
      <div>
        <ul>
          {rootQuery?.fields
            ? rootQuery?.fields.map((field) => (
                <li
                  key={field.name}
                  // onClick={() => handleFieldClick(field)}
                >
                  {field.name}
                  {field.args && <span>( </span>}
                  {field.args &&
                    field.args.map((arg) => (
                      <span key={arg.name}>
                        {arg.name}: {renderType(arg.type)},{' '}
                      </span>
                    ))}
                  {field.args && <span>)</span>}
                </li>
              ))
            : []}
        </ul>
      </div>
    </>
  );
};
