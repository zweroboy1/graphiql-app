import { render } from '@testing-library/react';
import { Layout } from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../../contexts/locale.context';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('Layout Component', () => {
  it('render component with header, footer, outlet', () => {
    const { getByTestId } = render(
      <Router>
        <LanguageContext.Provider
          value={{
            language: 'en',
            setLanguage: vi.fn,
            t: {
              Docs: 'Documentation',
            },
          }}
        >
          <Layout />
        </LanguageContext.Provider>
      </Router>
    );
    expect(getByTestId('header')).toBeInTheDocument();
  });
});
