import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { apiSetup } from '../config/api';
import { authSetup } from '../services/AuthServices';
import store from '../redux/store';

import Routes from './components/Routes';
import BuyModal from './components/BuyModal';
import SellModal from './components/SellModal';
import '../scss/application.scss';

class App extends Component {
  componentDidMount() {
    apiSetup(store.dispatch);
    authSetup(store.dispatch);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
        <BuyModal />
        <SellModal />
      </Provider>
    );
  }
}

App.defaultProps = {
  loading: false
};

export default App;
