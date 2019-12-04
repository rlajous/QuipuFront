import * as OrderService from '../../services/OrderService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  [
    'ORDER',
    'ORDER_SUCCESS',
    'ORDER_FAILURE',
    'PAGE',
    'RESET_ORDER',
    'HYDRATE_SELLS',
    'HYDRATE_SELLS_SUCCESS',
    'HYDRATE_SELLS_FAILURE',
    'HYDRATE_PURCHASES',
    'HYDRATE_PURCHASES_SUCCESS',
    'HYDRATE_PURCHASES_FAILURE'
  ],
  '@@ORDER'
);

const privateActionCreators = {
  orderSuccess() {
    return {
      type: actions.ORDER_SUCCESS
    };
  },
  orderFailure(err) {
    return {
      type: actions.ORDER_FAILURE,
      payload: { err }
    };
  },
  hydrateSellsSuccess(authData) {
    return {
      type: actions.HYDRATE_SELLS_SUCCESS,
      payload: authData
    };
  },
  hydrateSellFailure(err) {
    return {
      type: actions.HYDRATE_SELLS_FAILURE,
      payload: { err }
    };
  },
  hydratePurchasesSuccess(authData) {
    return {
      type: actions.HYDRATE_PURCHASES_SUCCESS,
      payload: authData
    };
  },
  hydratePurchasesFailure(err) {
    return {
      type: actions.HYDRATE_PURCHASES_FAILURE,
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
  buy(orderData) {
    return async dispatch => {
      dispatch({ type: actions.ORDER });
      try {
        const response = await OrderService.buy(orderData);
        if (response.ok) {
          dispatch(privateActionCreators.orderSuccess());
        }
      } catch (e) {
        dispatch(privateActionCreators.orderFailure(e));
      }
    };
  },
  sell(orderData) {
    return async dispatch => {
      dispatch({ type: actions.ORDER });
      try {
        const response = await OrderService.sell(orderData);
        if (response.ok) {
          dispatch(privateActionCreators.orderSuccess());
        }
      } catch (e) {
        dispatch(privateActionCreators.orderFailure(e));
      }
    };
  },
  handleResetOrder() {
    return {
      type: actions.RESET_ORDER
    };
  },
  hydrateSells(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_SELLS });
      try {
        const response = await OrderService.getSells(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateSellsSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateSellsFailure(e));
      }
    };
  },
  hydratePurchases(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_PURCHASES });
      try {
        const response = await OrderService.getPurchases(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydratePurchasesSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydratePurchasesFailure(e));
      }
    };
  }
};
