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
import { useGetGraphQlSchemaQuery } from '../../store/api/api';

export const ApiEndpointBtn: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange', resolver: yupResolver(urlSchema) });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const apiUrl = useSelector((state: RootState) => state.apiEndpoint.api);
  const { isFetching } = useGetGraphQlSchemaQuery(apiUrl);
  const { t } = useLocalization();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!isValid) {
      return;
    }
    dispatch(setApiEndpointSlice(data.endpoint));

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
            className={isFetching ? 'button button_loading' : 'button'}
            disabled={!isValid || isFetching || buttonDisabled}
            type="submit"
            role="submit"
          >
            <span>{t.Try}</span>
          </button>
        </div>
      </div>
    </form>
  );
};
