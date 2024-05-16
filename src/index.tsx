import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PortalProvider from '@cobalt/react-portal-provider';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import theme from '@cobalt/theme-light';

import App from './components/App/App';
import store from './store';
import './index.scss';

ReactDOM.render(
  <ViewportProvider>
    <ThemeProvider loader={() => Promise.resolve(theme)}>
      <PortalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PortalProvider>
    </ThemeProvider>
  </ViewportProvider>,
  document.getElementById('app'),
);
