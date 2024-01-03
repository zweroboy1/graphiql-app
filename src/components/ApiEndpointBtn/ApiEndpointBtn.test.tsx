import { Provider } from 'react-redux';
import { ApiEndpointBtn } from './ApiEndpointBtn';
import { render } from '@testing-library/react';
import { store } from '../../store/store';

describe('ApiEndpointBtn Component', () => {
  it.skip('renders ApiEndpointBtn component', async () => {
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <ApiEndpointBtn />
      </Provider>
    );

    expect(getByTestId('endpoint')).toBeInTheDocument();
    expect(getByRole('submit')).toBeInTheDocument();
  });
});
