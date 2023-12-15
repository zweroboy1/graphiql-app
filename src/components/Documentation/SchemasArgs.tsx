import React from 'react';
import { Type } from '../../types/types';
import { RootState } from '../../store/store';
import { Scalar } from './Scalar';
import { FieldsType } from '../../types/field.enum';
import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import { Loader } from '../Loader/Loader';
import { TypeLink } from './TypeLink';
import { useSelector } from 'react-redux';
import { TypeDetails } from './TypeDetails';
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

  if (isFetching) {
    return <Loader />;
  }

  const field = rootQuery && getField(rootQuery);

  return (
    <>
      {!rootQuery ? (
        data?.data.__schema.types.map((el) => (
          <div>
            <TypeLink type={el} />
          </div>
        ))
      ) : Array.isArray(field) ? (
        field.map((el) => <TypeDetails el={el} rootName={rootName} />)
      ) : (
        <Scalar rootQuery={rootQuery} />
      )}
    </>
  );
};
