import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  transactions: null,
  loading: false,
  initialLoading: true
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.HYDRATE_TRANSACTIONS: {
      return state.merge({ loading: true });
    }
    case actions.HYDRATE_TRANSACTIONS_SUCCESS: {
      return state.merge({
        loading: false,
        transactions: action.payload.transactions
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
