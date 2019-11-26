import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  filter: 'day',
  loading: true,
  statistics: null
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.FILTER: {
      return state.merge({
        loading: false,
        filter: action.payload.authData
      });
    }
    case actions.HYDRATE_STATISTICS: {
      return state.merge({ loading: true });
    }
    case actions.HYDRATE_STATISTICS_SUCCESS: {
      return state.merge({
        loading: false,
        statistics: action.payload
      });
    }
    case actions.HYDRATE_STATISTICS_FAILURE: {
      return state.merge({
        loading: false,
        statistics: null,
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
