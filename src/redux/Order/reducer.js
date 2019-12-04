import Immutable from 'seamless-immutable';

import { actions } from './actions';

const defaultState = {
  loading: false,
  tokens: 0,
  price: 0,
  success: null,
  err: null,
  purchases: [],
  sells: [],
  amount: 10,
  page: 0,
  totalPages: 1
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.PAGE: {
      return state.merge({
        loading: false,
        page: action.payload
      });
    }
    case actions.RESET_ORDER: {
      return state.merge({
        success: null,
        err: null
      });
    }
    case actions.ORDER: {
      return state.merge({
        loading: true,
        success: null,
        err: null
      });
    }
    case actions.ORDER_SUCCESS: {
      return state.merge({
        loading: false,
        success: null
      });
    }
    case actions.ORDER_FAILURE: {
      return state.merge({
        loading: false,
        err: action.payload.err
      });
    }
    case actions.HYDRATE_SELLS: {
      return state.merge({ loading: true, purchases: [] });
    }
    case actions.HYDRATE_SELLS_SUCCESS: {
      return state.merge({
        loading: false,
        sells: action.payload.sells,
        totalPages: action.payload.pages
      });
    }
    case actions.HYDRATE_SELLS_FAILURE: {
      return state.merge({
        loading: false,
        sells: [],
        err: action.payload.err
      });
    }
    case actions.HYDRATE_PURCHASES: {
      return state.merge({ loading: true, sells: [] });
    }
    case actions.HYDRATE_PURCHASES_SUCCESS: {
      return state.merge({
        loading: false,
        purchases: action.payload.purchases,
        totalPages: action.payload.pages
      });
    }
    case actions.HYDRATE_PURCHASES_FAILURE: {
      return state.merge({
        loading: false,
        purchases: [],
        err: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}
