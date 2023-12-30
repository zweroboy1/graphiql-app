import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './store/store';
import './assets/scss/style.scss';
import { LanguageProvider } from './contexts/locale.context';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
