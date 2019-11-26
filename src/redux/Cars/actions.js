import * as CarsService from '../../services/CarsService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['HYDRATE_CARS', 'HYDRATE_CARS_SUCCESS', 'HYDRATE_CARS_FAILURE'],
  '@@CARS'
);

const privateActionCreators = {
  hydrateCarsSuccess(cars) {
    return {
      type: actions.HYDRATE_CARS_SUCCESS,
      payload: { cars }
    };
  },
  hydrateCarsFailure(err) {
    return {
      type: actions.HYDRATE_CARS_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  hydrateCars() {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_CARS });
      try {
        const response = await CarsService.getCars();
        if (response.ok) {
          dispatch(privateActionCreators.hydrateCarsSuccess(response.data));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateCarsFailure(e));
      }
    };
  }
};
