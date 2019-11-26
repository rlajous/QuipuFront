import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

import App from './app';
import './config/i18n';
import './scss/application.scss';
import { unregister } from './serviceWorker';

const config = {
  google: {
    families: ['Montserrat:400']
  }
};

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <WebfontLoader config={config}>
        <App />
      </WebfontLoader>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render once
render(App);

unregister();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
