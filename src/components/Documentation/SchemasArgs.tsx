import React, { useState } from 'react';
import { Type } from '../../types/types';
import { RootState } from '../../store/store';
import { Scalar } from './Scalar';
import { FieldsType } from '../../types/field.enum';
import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import { Loader } from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { TypeDetails } from './TypeDetails';
import { setActiveType } from '../../store/slices/activeTypeSlice';
import { GoBackBtn } from './GoBackBtn/GoBackBtn';

export const SchemasArgs: React.FC = () => {
  const { data, isFetching } = useGetGraphQlSchemaQuery();
  const activeType = useSelector((state: RootState) => state.type.name);
  const dispatch = useDispatch();
  const [history, setHistory] = useState<string[]>([]);
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

  if (isFetching) {
    return <Loader />;
  }

  const field = rootQuery && getField(rootQuery);
  const prevType = history.length > 0 ? history[history.length - 1] : '';

  const handleButtonClick = () => {
    const prevType = history.pop();
    if (prevType) {
      dispatch(setActiveType(prevType));
      setHistory([...history]);
    }
  };

  const historyUpdate = (typeName: string) => {
    dispatch(setActiveType(typeName));
    setHistory([...history, activeType]);
  };

  return (
    <>
      {history.length === 0 ? (
        <></>
      ) : (
        <GoBackBtn callback={handleButtonClick} prev={prevType} />
      )}
      {Array.isArray(field)
        ? field.map((el) => (
            <div key={el.name}>
              <TypeDetails el={el} onClick={() => historyUpdate(el.name)} />
            </div>
          ))
        : rootQuery && <Scalar rootQuery={rootQuery} />}
    </>
  );
};
