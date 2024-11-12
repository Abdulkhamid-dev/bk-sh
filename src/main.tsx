import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { persistor, store } from './redux/store';
import { theme } from './constants/theme';
import Router from './router';

import './styles/app.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
);
