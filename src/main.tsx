import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import './assets/scss/style.scss';
import { LanguageProvider } from './cantexts/locale.context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
