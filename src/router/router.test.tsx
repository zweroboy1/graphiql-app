import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { LanguageContext } from '../contexts/locale.context';

describe('Router', () => {
  it('renders Main component', () => {
    render(
      <LanguageContext.Provider
        value={{
          language: 'en',
          setLanguage: vi.fn,
          t: {
            Docs: 'Documentation',
          },
        }}
      >
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Router />
          </MemoryRouter>
        </Provider>
      </LanguageContext.Provider>
    );

    const mainComponent = screen.getByTestId('main');
    expect(mainComponent).toBeInTheDocument();
  });

  it('render register component for /register path', () => {
    render(
      <LanguageContext.Provider
        value={{
          language: 'en',
          setLanguage: vi.fn,
          t: {
            Docs: 'Documentation',
          },
        }}
      >
        <Provider store={store}>
          <MemoryRouter initialEntries={['/register']}>
            <Router />
          </MemoryRouter>
        </Provider>
      </LanguageContext.Provider>
    );

    const registerComponent = screen.getByTestId('register');
    expect(registerComponent).toBeInTheDocument();
  });

  it('render login component for /login path', () => {
    render(
      <LanguageContext.Provider
        value={{
          language: 'en',
          setLanguage: vi.fn,
          t: {
            Docs: 'Documentation',
          },
        }}
      >
        <Provider store={store}>
          <MemoryRouter initialEntries={['/login']}>
            <Router />
          </MemoryRouter>
        </Provider>
      </LanguageContext.Provider>
    );

    const loginComponent = screen.getByTestId('login');
    expect(loginComponent).toBeInTheDocument();
  });

  it.skip('render graph-ql component for /graph-ql path', () => {
    render(
      <LanguageContext.Provider
        value={{
          language: 'en',
          setLanguage: vi.fn,
          t: {
            Docs: 'Documentation',
          },
        }}
      >
        <Provider store={store}>
          <MemoryRouter initialEntries={['/graph-ql']}>
            <Router />
          </MemoryRouter>
        </Provider>
      </LanguageContext.Provider>
    );

    const graphQlComponent = screen.getByTestId('graph-ql');
    expect(graphQlComponent).toBeInTheDocument();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unkdcncdks']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/NotFound/i)).toBeInTheDocument();
  });
});
