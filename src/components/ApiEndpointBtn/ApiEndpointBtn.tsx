import { useDispatch } from 'react-redux';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';

export const ApiEndpointBtn: React.FC = () => {
  const dispatch = useDispatch();

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setApiEndpointSlice(inputValue));
  };

  return (
    <div>
      <input placeholder="Enter your api..." onChange={HandleInputChange} />
    </div>
  );
};
