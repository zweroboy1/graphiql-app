import React /* ,  { useState } */ from 'react';
// import {  useDispatch,  useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
// import { RootState } from '../../store/store';
// import { MdOutlineRefresh } from 'react-icons/md';
// import { useGetGraphQlSchemaQuery } from '../../store/api/api';
import { TextField } from '../../components/inputs/TextField';
import './ApiEndpointBtn.css';

export const ApiEndpointBtn: React.FC = () => {
  const {
    register,
    formState: { /* errors,*/ isValid },
    // handleSubmit,
  } = useForm({ mode: 'onChange' });
  const submiting = false;
  // const [submiting, setSubmiting] = useState(false);
  // const dispatch = useDispatch();
  /*
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  
  const { isFetching } = useGetGraphQlSchemaQuery(apiUrl);

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setApiEndpointSlice(inputValue));
    
  };
  
        <MdOutlineRefresh className={`icon ${isFetching ? 'rotate' : ''}`} />

  <input
        style={{
          width: '30vw',
          paddingLeft: '30px',
          position: 'absolute',
          top: '10px',
          left: '107px',
        }}
placeholder="Enter your api..."
        onChange={HandleInputChange}
        value={apiUrl}
      />
   */
  return (
    <form>
      <div className="playground__header">
        <TextField
          id="endpoint"
          type="text"
          label="Endpoint"
          placeholder="Enter API endpoint..."
          autocomplete="off"
          register={register}
        />
        <div className="playground__button-container">
          <button
            className={submiting ? 'button button_loading' : 'button'}
            disabled={!isValid || submiting}
            type="submit"
            role="submit"
          >
            <span>Try</span>
          </button>
        </div>
      </div>
    </form>
  );
};
