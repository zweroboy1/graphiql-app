import React from 'react';
import '../Schema/Schema.css';
import { Type } from '../../types/types';
import { RootState } from '../../store/store';
import { Scalar } from './Scalar';
import { FieldsType } from '../../types/field.enum';
import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import { Loader } from '../Loader/Loader';
import { TypeLink } from './TypeLink';
import { useSelector } from 'react-redux';

export const SchemasArgs: React.FC = () => {
  const { data, isFetching } = useGetGraphQlSchemaQuery();
  const activeType = useSelector((state: RootState) => state.type.name);
  const rootQuery = data?.data.__schema.types.find(
    (elem) => elem.name === activeType
  );

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
      {!isFetching && rootQuery && Array.isArray(getField(rootQuery))
        ? getField(rootQuery)!.map((el) => {
            return (
              <div key={el.name}>
                {el.name}
                {el.args && <span>( </span>}
                {el.args &&
                  el.args.map((arg) => (
                    <span key={arg.name}>
                      {arg.name}: <TypeLink type={arg.type} />,
                    </span>
                  ))}
                {el.args && <span>){' : '}</span>}

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
  );
};
