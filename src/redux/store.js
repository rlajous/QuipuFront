import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';

/*
 * TODO Add this if you need it
 * import AnalyticsMiddleware from '../services/AnalyticsService';
 */
import { reducer as auth } from './Auth/reducer';
import { reducer as transactions } from './Transactions/reducer';
import { reducer as marketPlace } from './MarketPlace/reducer';
import { reducer as modal } from './Modal/reducer';
import { reducer as order } from './Order/reducer';

export const history = createBrowserHistory();

// Add reducers here
const reducers = combineReducers({
  auth,
  form,
  transactions,
  marketPlace,
  modal,
  order,
  router: connectRouter(history)
});

const middlewares = [thunk, routerMiddleware(history)];
const enhancers = [];

// TODO Add this if you need it.
/* ------------- Analytics Middleware ------------- */
// Middlewares.push(AnalyticsMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) =>
  /*
   * TODO Add this if you need it
   * if (action.type === authActions.SIGN_OUT) {
   *   return reducers(getGlobalState(state), action);
   * }
   */
  reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
