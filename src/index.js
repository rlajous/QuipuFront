import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './config/i18n';
import './scss/application.scss';
import { unregister } from './serviceWorker';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
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
