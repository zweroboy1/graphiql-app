import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
import { TextField } from '../../components/inputs/TextField';
import { urlSchema } from '../../schemas';
import { clearAllHistory } from '../../store/slices/history.slice';
import { setActiveType } from '../../store/slices/activeTypeSlice';
import { RootState } from '../../store/store';

export const ApiEndpointBtn: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(urlSchema) });
  const [buttonDisabled] = useState(false);
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isValid) {
      return;
    }
    dispatch(setApiEndpointSlice(data.endpoint));

    toast.success('Valid GraphQL endpoint!', {
      toastId: 'toast',
      className: 'toast-success',
    });

    dispatch(clearAllHistory());
    dispatch(setActiveType('Query'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="playground__header">
        <TextField
          id="endpoint"
          type="text"
          label="Endpoint"
          placeholder="Enter API endpoint..."
          autocomplete="url"
          register={register}
          defaultValue={apiUrl}
          error={errors['endpoint']}
        />
        <div className="playground__button-container">
          <button
            className={'button'}
            disabled={!isValid || buttonDisabled}
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
