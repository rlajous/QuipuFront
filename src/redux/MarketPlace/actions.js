import { stringArrayToObject } from '../../utils/array';
import * as MarketPlaceService from '../../services/MarketPlaceService';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  [
    'PAGE',
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
  updatePage(page) {
    return {
      type: actions.PAGE,
      payload: page
    };
  },
  hydrateSellers(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_SELLERS });
      try {
        const response = await MarketPlaceService.getSellers(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateSellersSuccess(response.data));
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
          console.log(response.data);
          dispatch(privateActionCreators.hydrateBuyersSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateBuyersFailure(e));
      }
    };
  }
};
