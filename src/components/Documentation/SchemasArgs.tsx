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
import { removeFromHistory } from '../../store/slices/history.slice';

export const SchemasArgs: React.FC = () => {
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const { data, isFetching } = useGetGraphQlSchemaQuery(apiUrl);
  const activeType = useSelector((state: RootState) => state.type.name);
  const history = useSelector((state: RootState) => state.history.history);
  const dispatch = useDispatch();
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

  const field = rootQuery && getField(rootQuery);
  const prevType = history.length > 0 ? history[history.length - 1] : '';

  const handleButtonClick = () => {
    dispatch(removeFromHistory());
    const prevType = history[history.length - 1];
    prevType && dispatch(setActiveType(prevType));
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="docs__header">
          <div className="docs__title h3">{activeType}</div>
          <div>
            {history.length !== 0 && (
              <GoBackBtn
                data-testId="goBackButton"
                callback={handleButtonClick}
                prev={prevType}
              />
            )}
          </div>
          {Array.isArray(field)
            ? field.map((el) => (
                <div key={el.name}>
                  <TypeDetails el={el} />
                </div>
              ))
            : rootQuery && <Scalar rootQuery={rootQuery} />}
        </div>
      )}
    </>
  );
};
