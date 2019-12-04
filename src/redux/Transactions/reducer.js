import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

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

/* ------------- Transactions propTypes ------------- */
const date = PropTypes.shape({
  _nanoseconds: PropTypes.number.isRequired,
  _seconds: PropTypes.number.isRequired
});

const transaction = PropTypes.shape({
  buyerId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sellerId: PropTypes.string.isRequired,
  tokens: PropTypes.number.isRequired,
  date
});

export const propTypes = {
  transactions: PropTypes.arrayOf(transaction)
};
