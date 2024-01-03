import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './store/store';
import { LanguageProvider } from './contexts/locale.context';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './components/App/App';

test('renders App component', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(getByTestId('main')).toBeInTheDocument();
  });
});
