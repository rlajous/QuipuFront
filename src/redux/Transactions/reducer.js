import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  transactions: [],
  loading: false,
  initialLoading: true,
  amount: 5,
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
    case actions.HYDRATE_TRANSACTIONS: {
      return state.merge({ loading: true, transactions: [] });
    }
    case actions.HYDRATE_TRANSACTIONS_SUCCESS: {
      return state.merge({
        loading: false,
        transactions: action.payload.transactions,
        totalPages: action.payload.pages
      });
    }
    case actions.HYDRATE_TRANSACTIONS_FAILURE: {
      return state.merge({
        loading: false,
        transactions: null,
        err: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}
/* eslint-enable complexity */

/* ------------- Auth propTypes ------------- */
export const propTypes = {
  loading: PropTypes.bool.isRequired,
  initialLoading: PropTypes.bool.isRequired,
  transactions: PropTypes.array
};
