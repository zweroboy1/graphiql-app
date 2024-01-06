import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalization } from '../../contexts/locale.context';
import { setApiEndpointSlice } from '../../store/slices/apiEndpoint.slice';
import { TextField } from '../../components/inputs/TextField';
import { urlSchema } from '../../schemas';
import { clearAllHistory } from '../../store/slices/history.slice';
import { setActiveType } from '../../store/slices/activeTypeSlice';
import { RootState } from '../../store/store';
import { useFetchGraphQlSchemaMutation } from '../../store/api/api';
import { getErrorText } from '../../utils/getErrorText';

export const ApiEndpointBtn: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(urlSchema) });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const { t, language } = useLocalization();
  const [fetchSchema, { isLoading }] = useFetchGraphQlSchemaMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (form) => {
    if (!isValid) {
      return;
    }

    const result = await fetchSchema(form.endpoint);
    if ('error' in result) {
      const errorCode =
        'status' in result.error ? String(result.error.status) : null;
      const toastText = getErrorText(errorCode, language, form.endpoint);
      setButtonDisabled(true);
      toast.error(toastText, {
        toastId: 'toast',
        className: 'toast-error',
      });
      return;
    }

    dispatch(setApiEndpointSlice(form.endpoint));
    toast.success(t.ValidEndpoint, {
      toastId: 'toast',
      className: 'toast-success',
    });

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
          data-testid="endpoint"
          type="text"
          label={t.Endpoint}
          placeholder={t.EnterEndpoint}
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
            data-testid="submit"
          >
            <span>{t.Try}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
