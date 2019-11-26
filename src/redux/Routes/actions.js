import * as CarsService from '../../services/CarsService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  [
    'HYDRATE_MOVING_CARS',
    'HYDRATE_MOVING_CARS_SUCCESS',
    'HYDRATE_MOVING_CARS_FAILURE',
    'HYDRATE_HEAT_SUCCESS',
    'HYDRATE_HEAT_FAILURE',
    'HYDRATE_HEAT_CARS'
  ],
  '@@ROUTES'
);

const privateActionCreators = {
  hydrateMovingCarsSuccess(data) {
    return {
      type: actions.HYDRATE_MOVING_CARS_SUCCESS,
      payload: data
    };
  },
  hydrateMovingCarsFailure(err) {
    return {
      type: actions.HYDRATE_MOVING_CARS_FAILURE,
      payload: { err }
    };
  },
  hydrateHeatCarsSuccess(data) {
    return {
      type: actions.HYDRATE_HEAT_SUCCESS,
      payload: data
    };
  },
  hydrateHeatCarsFailure(err) {
    return {
      type: actions.HYDRATE_HEAT_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  hydrateMovingCars() {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_MOVING_CARS });
      try {
        const response = await CarsService.getMovingCars();

        if (response.ok) {
          dispatch(privateActionCreators.hydrateMovingCarsSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateMovingCarsFailure(e));
      }
    };
  },
  hydrateHeatmapCars(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_HEAT_CARS });
      try {
        const response = await CarsService.getHeatCars(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateHeatCarsSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateHeatCarsFailure(e));
      }
    };
  }
};
