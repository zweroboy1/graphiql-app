import { useDispatch, useSelector } from 'react-redux';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
import { RootState } from '../../store/store';
import { MdOutlineRefresh } from 'react-icons/md';
import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import './ApiEndpointBtn.css';

export const ApiEndpointBtn: React.FC = () => {
  const dispatch = useDispatch();
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const { isFetching, error } = useGetGraphQlSchemaQuery(apiUrl);

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setApiEndpointSlice(inputValue));
  };

  return (
    <div style={{ position: 'relative' }}>
      <MdOutlineRefresh
        className={isFetching ? 'icon-rotate' : 'icon'}
        style={{}}
      />
      <input
        style={{
          width: 'calc(100vh - 30px)',
          paddingLeft: '30px',
        }}
        placeholder="Enter your api..."
        onChange={HandleInputChange}
        value={apiUrl}
      />
      {error && 'error' in error && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: '#e44d4d',
            fontSize: '12px',
          }}
        >
          {error.error}
        </div>
      )}
    </div>
  );
};
