import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GraphQl } from './GraphQl';
import { store } from '../../store/store';
import { LanguageContext } from '../../contexts/locale.context';

test('renders GraphQl component', async () => {
  const { getByTestId } = render(
    <BrowserRouter>
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
          <GraphQl />
        </Provider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );

  const graphQlComponent = getByTestId('graph-ql');
  expect(graphQlComponent).toBeInTheDocument();
});
