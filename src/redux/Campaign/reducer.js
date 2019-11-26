import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  campaign: null,
  loading: true
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.HYDRATE_CAMPAIGN: {
      return state.merge({ loading: true });
    }
    case actions.HYDRATE_CAMPAIGN_SUCCESS: {
      return state.merge({
        loading: false,
        campaign: action.payload
      });
    }
    case actions.HYDRATE_CAMPAIGN_FAILURE: {
      return state.merge({
        loading: false,
        campaign: null,
        err: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}
/* eslint-enable complexity */

/* ------------- Routes propTypes ------------- */
export const propTypes = {
  loading: PropTypes.bool.isRequired
  // TODO: Extend user model definition
};
