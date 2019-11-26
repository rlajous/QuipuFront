import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  liveCars: null,
  heatCars: null,
  routeCars: null,
  loading: true
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.HYDRATE_MOVING_CARS: {
      return state.merge({ loading: true });
    }
    case actions.HYDRATE_MOVING_CARS_SUCCESS: {
      return state.merge({
        loading: false,
        liveCars: action.payload
      });
    }
    case actions.HYDRATE_MOVING_CARS_FAILURE: {
      return state.merge({
        loading: false,
        liveCars: null,
        err: action.payload.err
      });
    }
    case actions.HYDRATE_HEAT_CARS: {
      return state.merge({ loading: true });
    }
    case actions.HYDRATE_HEAT_SUCCESS: {
      return state.merge({
        loading: false,
        heatCars: action.payload
      });
    }
    case actions.HYDRATE_HEAT_FAILURE: {
      return state.merge({
        loading: false,
        heatCars: null,
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
