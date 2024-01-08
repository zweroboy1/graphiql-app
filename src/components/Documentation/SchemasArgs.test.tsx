import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { SchemasArgs } from './SchemasArgs';

describe('SchemasArgs Component', () => {
  it('renders loader while fetching data', () => {
    render(
      <Provider store={store}>
        <SchemasArgs />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('no loading indicator when loading finished', async () => {
    render(
      <Provider store={store}>
        <SchemasArgs />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });
});
