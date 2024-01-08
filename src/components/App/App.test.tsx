import { App } from './App';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { LanguageProvider } from '../../contexts/locale.context';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { act } from 'react-dom/test-utils';
import { auth } from '../../firebase';
import { Mock } from 'vitest';

vi.mock('../../firebase');

const onAuthStateChangedMock = (
  auth.onAuthStateChanged as Mock
).mockReturnValue(() => {});

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

  it('should onAuthStateChanged work', async () => {
    await waitFor(() => {
      expect(onAuthStateChangedMock).toHaveBeenCalledOnce();
    });
  });
});
