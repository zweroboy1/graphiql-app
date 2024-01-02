import { render, screen } from '@testing-library/react';
import { Documentation } from './Documentation';
import { LanguageContext } from '../../contexts/locale.context';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Documentation', () => {
  it('render Documentation component with english localization', () => {
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
          <Documentation isOpen={true} />
        </Provider>
      </LanguageContext.Provider>
    );
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });
});
