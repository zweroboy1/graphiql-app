import React, { useEffect } from 'react';
import '../Schema/Schema.css';
import { Type3 } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setActiveType } from '../../store/slices/activeTypeSlice';

export const SchemasArgs: React.FC = () => {
  const schema = useSelector((state: RootState) => state.schemas.schema);
  const activeType = useSelector((state: RootState) => state.type.name);
  const rootQuery =
    schema && schema.__schema.types.find((elem) => elem.name === activeType);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('activeType:', activeType);
    console.log('rootQuery:', rootQuery);
  }, [activeType, rootQuery]);

  const renderType = (type: Type3): string => {
    if (type.ofType) {
      const typeName = type.name || '';
      return (
        typeName +
        (typeof type.ofType === 'string'
          ? type.ofType
          : renderType(type.ofType))
      );
    } else {
      return type.name || '';
    }
  };
  return (
    <>
      <div>
        <ul>
          {rootQuery?.fields ? (
            rootQuery?.fields?.map((field) => (
              <li key={field.name} style={{ padding: '5px' }}>
                {field.name}
                {field.args && <span>( </span>}
                {field.args &&
                  field.args.map((arg) => (
                    <span key={arg.name}>
                      {arg.name}:{' '}
                      <button
                        onClick={() =>
                          dispatch(setActiveType(renderType(arg.type)))
                        }
                      >
                        {renderType(arg.type)}
                      </button>
                      ,
                    </span>
                  ))}
                {field.args && <span>)</span>}
                {': '}
                <button
                  onClick={() =>
                    dispatch(setActiveType(renderType(field.type)))
                  }
                >
                  {renderType(field.type)}
                </button>
                <div>{field.description}</div>
              </li>
            ))
          ) : rootQuery?.inputFields ? (
            rootQuery?.inputFields?.map((field) => (
              <li key={field.name} style={{ padding: '5px' }}>
                {field.name}
                <button
                  onClick={() =>
                    dispatch(setActiveType(renderType(field.type)))
                  }
                >
                  {renderType(field.type)}
                </button>
                <div>{field.description}</div>
              </li>
            ))
          ) : (
            // : schema?.__schema.types ? (
            //   schema?.__schema.types.map((type) => (
            //     <li key={type.name} style={{ padding: '5px' }} onClick={() => dispatch(setActiveType(renderType(type)))}>
            //       {type.name}
            //     </li>
            //   ))
            // )
            <div>{rootQuery?.description}</div>
          )}
        </ul>
      </div>
    </>
  );
};
