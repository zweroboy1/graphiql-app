import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
import { RootState } from '../../store/store';
import { useFetchGraphQlSchemaMutation } from '../../store/api/api';
import { TextField } from '../../components/inputs/TextField';
import { urlSchema } from '../../schemas';
import { getErrorText } from '../../utils/getErrorText';
import { clearAllHistory } from '../../store/slices/history.slice';
import { setActiveType } from '../../store/slices/activeTypeSlice';

export const ApiEndpointBtn: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(urlSchema) });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const [fetchSchema, { isLoading }] = useFetchGraphQlSchemaMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isValid) {
      return;
    }
    const result = await fetchSchema(data.endpoint);
    if ('error' in result) {
      const errorCode =
        'status' in result.error ? String(result.error.status) : null;
      const toastText = getErrorText(errorCode, 'en');
      setButtonDisabled(true);
      toast.error(toastText, {
        toastId: 'toast',
        className: 'toast-error',
      });
      return;
    }

    toast.success('Valid GraphQL endpoint!', {
      toastId: 'toast',
      className: 'toast-success',
    });
    dispatch(setApiEndpointSlice(data.endpoint));
    dispatch(clearAllHistory());
    dispatch(setActiveType('Query'));
  };

  useEffect(() => {
    toast.onChange((v) => {
      if (v.status === 'removed') {
        setButtonDisabled(false);
      }
    });
  }, []);

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
            className={isLoading ? 'button button_loading' : 'button'}
            disabled={!isValid || isLoading || buttonDisabled}
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
