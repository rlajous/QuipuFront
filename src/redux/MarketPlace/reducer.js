import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  filter: 'day',
  loading: true,
  sellers: [],
  buyers: [],
  amount: 1,
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
/* eslint-enable complexity */

/* ------------- Auth propTypes ------------- */
export const propTypes = {
  loading: PropTypes.bool.isRequired,
  initialLoading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
    // TODO: Extend user model definition
  })
};
