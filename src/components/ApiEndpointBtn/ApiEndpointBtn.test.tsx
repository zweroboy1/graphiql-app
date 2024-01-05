import { MemoryRouter } from 'react-router';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ApiEndpointBtn } from './ApiEndpointBtn';

import { LanguageProvider } from '../../contexts/locale.context';
import { store } from '../../store/store';
import * as GraphQlSchemaQuery from '../../store/api/api';
import * as ApiEndpointSlice from '../../store/slices/apiEndpoint.slice';

import type { Mock } from 'vitest';

const setApiEndpointSliceMock = vi.spyOn(
  ApiEndpointSlice,
  'setApiEndpointSlice'
);

const GraphQlSchemaQueryResult = {
  isFetching: false,
};

(
  vi.spyOn(GraphQlSchemaQuery, 'useGetGraphQlSchemaQuery') as Mock
).mockReturnValue(GraphQlSchemaQueryResult);

const FetchGraphQlSchemaMutationMock = [() => ({}), { isLoading: false }];

(
  vi.spyOn(GraphQlSchemaQuery, 'useFetchGraphQlSchemaMutation') as Mock
).mockReturnValue(FetchGraphQlSchemaMutationMock);

describe('APIEndpoint button:', () => {
  let input: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Provider store={store}>
              <ApiEndpointBtn />
            </Provider>
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    waitFor(() => {
      input = screen.getByRole('endpoint');
      submitButton = screen.getByRole('submit');
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should has input for api endpoint', () => {
    expect(input).toBeInTheDocument();
  });

  it('should has button for submit form', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it('should display error for invalid input', async () => {
    fireEvent.change(input, { target: { value: 'testEndpoint' } });
    await waitFor(() => {
      const error = screen.getByText('Invalid URL format');
      expect(error).toBeInTheDocument();
    });
  });

  it('should display error for invalid input', async () => {
    fireEvent.change(input, { target: { value: 'testEndpoint' } });
    await waitFor(() => {
      const error = screen.getByText('Invalid URL format');
      expect(error).toBeInTheDocument();
    });
  });

  it('should not submit form', async () => {
    fireEvent.change(input, { target: { value: 'gra.io' } });
    fireEvent.click(screen.getByRole('submit'));

    await waitFor(() => {
      expect(setApiEndpointSliceMock).not.toBeCalled();
    });
  });

  it('should submit form', async () => {
    await waitFor(() => {
      fireEvent.change(input, {
        target: { value: 'https://gra.io' },
      });
    });
    fireEvent.click(screen.getByRole('submit'));

    await waitFor(() => {
      expect(setApiEndpointSliceMock).toHaveBeenCalledOnce();
    });
  });
});
