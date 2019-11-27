import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  loading: false,
  tokens: 0,
  price: 0,
  success: false,
  err: false
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.PRICE: {
      return state.merge({
        price: action.payload
      });
    }
    case actions.TOKENS: {
      return state.merge({
        tokens: action.payload
      });
    }
    case actions.ORDER: {
      return state.merge({ loading: true });
    }
    case actions.ORDER_SUCCESS: {
      return state.merge({
        loading: false,
        success: true
      });
    }
    case actions.ORDER_FAILURE: {
      return state.merge({
        loading: false,
        err: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}
