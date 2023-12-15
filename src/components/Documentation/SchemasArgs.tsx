import React from 'react';
import { Type } from '../../types/types';
import { RootState } from '../../store/store';
import { Scalar } from './Scalar';
import { FieldsType } from '../../types/field.enum';
import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import { Loader } from '../Loader/Loader';
import { TypeLink } from './TypeLink';
import { useSelector } from 'react-redux';
import '../Schema/Schema.css';

export const SchemasArgs: React.FC = () => {
  const { data, isFetching } = useGetGraphQlSchemaQuery();
  const activeType = useSelector((state: RootState) => state.type.name);
  const rootQuery = data?.data.__schema.types.find(
    (elem) => elem.name === activeType
  );
  const rootName = rootQuery?.name;

  const getField = (field: Type) => {
    if (field.kind === FieldsType.OBJECT) {
      return field?.fields;
    } else if (field.kind === FieldsType.INPUT_OBJECT) {
      return field?.inputFields;
    } else if (field.kind === FieldsType.ENUM) {
      return field?.enumValues;
    }
  };

  return (
    <>
      {isFetching && <Loader />}
      {rootQuery === undefined ? (
        data?.data.__schema.types.map((el) => (
          <div>
            <TypeLink type={el} />
          </div>
        ))
      ) : (
        <>
          {!isFetching && rootQuery && Array.isArray(getField(rootQuery))
            ? getField(rootQuery)!.map((el) => {
                return (
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
                );
              })
            : rootQuery && <Scalar rootQuery={rootQuery} />}
        </>
      )}
    </>
  );
};
