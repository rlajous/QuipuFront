import { stringArrayToObject } from '../../utils/array';
import * as MarketPlaceService from '../../services/MarketPlaceService';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  [
    'FILTER',
    'HYDRATE_SELLERS',
    'HYDRATE_SELLERS_SUCCESS',
    'HYDRATE_SELLERS_FAILURE',
    'HYDRATE_BUYERS',
    'HYDRATE_BUYERS_SUCCESS',
    'HYDRATE_BUYERS_FAILURE'
  ],
  '@@MARKETPLACE'
);

const privateActionCreators = {
  filterSuccess(authData) {
    return {
      type: actions.FILTER,
      payload: { authData }
    };
  },
  hydrateSellersSuccess(authData) {
    return {
      type: actions.HYDRATE_SELLERS_SUCCESS,
      payload: authData
    };
  },
  hydrateSellersFailure(err) {
    return {
      type: actions.HYDRATE_SELLERS_FAILURE,
      payload: { err }
    };
  },
  hydrateBuyersSuccess(authData) {
    return {
      type: actions.HYDRATE_BUYERS_SUCCESS,
      payload: authData
    };
  },
  hydrateBuyersFailure(err) {
    return {
      type: actions.HYDRATE_BUYERS_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  updateFilter(authData) {
    return dispatch => {
      dispatch(privateActionCreators.filterSuccess(authData));
    };
  },
  hydrateSellers(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_SELLERS });
      try {
        const response = await MarketPlaceService.getSellers(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateSellersSuccess(response.data.sellers));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateSellersFailure(e));
      }
    };
  },
  hydrateBuyers(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_BUYERS });
      try {
        const response = await MarketPlaceService.getBuyers(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateBuyersSuccess(response.data.buyers));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateBuyersFailure(e));
      }
    };
  }
};
