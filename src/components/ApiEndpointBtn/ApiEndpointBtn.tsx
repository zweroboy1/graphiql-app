import { useDispatch, useSelector } from 'react-redux';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
import { RootState } from '../../store/store';

export const ApiEndpointBtn: React.FC = () => {
  const dispatch = useDispatch();
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setApiEndpointSlice(inputValue));
  };

  return (
    <div>
      <input
        style={{
          width: '100vh',
        }}
        placeholder="Enter your api..."
        onChange={HandleInputChange}
        value={apiUrl}
      />
    </div>
  );
};
