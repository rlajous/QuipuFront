import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Modal reducer ------------- */
const defaultState = {
  showSellModal: false,
  showBuyModal: false
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.SELL_MODAL: {
      return state.merge({
        showSellModal: action.payload.bool
      });
    }
    case actions.BUY_MODAL: {
      return state.merge({
        showBuyModal: action.payload.bool
      });
    }
    default: {
      return state;
    }
  }
}
