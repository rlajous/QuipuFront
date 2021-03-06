import Immutable from 'seamless-immutable';

import { actions } from './actions';

const defaultState = {
  filter: 'day',
  loading: true,
  sellers: [],
  buyers: [],
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
    case actions.HYDRATE_SELLERS: {
      return state.merge({ loading: true, buyers: [] });
    }
    case actions.HYDRATE_SELLERS_SUCCESS: {
      return state.merge({
        loading: false,
        sellers: action.payload.sellers,
        totalPages: action.payload.pages
      });
    }
    case actions.HYDRATE_SELLERS_FAILURE: {
      return state.merge({
        loading: false,
        sellers: [],
        err: action.payload.err
      });
    }
    case actions.HYDRATE_BUYERS: {
      return state.merge({ loading: true, sellers: [] });
    }
    case actions.HYDRATE_BUYERS_SUCCESS: {
      return state.merge({
        loading: false,
        buyers: action.payload.buyers,
        totalPages: action.payload.pages
      });
    }
    case actions.HYDRATE_BUYERS_FAILURE: {
      return state.merge({
        loading: false,
        buyers: [],
        err: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}
