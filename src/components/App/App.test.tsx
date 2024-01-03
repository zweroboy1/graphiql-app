import { App } from './App';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/locale.context';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';

describe('App:', () => {
  beforeEach(() => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </LanguageProvider>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be rendered', () => {
    // expect(input).toBeInTheDocument();
  });
});
