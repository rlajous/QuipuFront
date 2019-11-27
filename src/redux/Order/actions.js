import * as OrderService from '../../services/OrderService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['ORDER', 'ORDER_SUCCESS', 'ORDER_FAILURE', 'TOKENS', 'PRICE'],
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
  }
};

export const actionCreators = {
  handlePriceChange(price) {
    return {
      type: actions.PRICE,
      payload: price
    };
  },
  handleTokenChange(tokens) {
    return {
      type: actions.TOKENS,
      payload: tokens
    };
  },
  buy(orderData) {
    return async dispatch => {
      dispatch({ type: actions.ORDER });
      await OrderService.buy(orderData)
        .then(() => {
          dispatch(privateActionCreators.orderSuccess());
        })
        .catch(error => {
          dispatch(privateActionCreators.orderFailure(error));
        });
    };
  },
  sell(orderData) {
    return async dispatch => {
      dispatch({ type: actions.ORDER });
      await OrderService.sell(orderData)
        .then(() => {
          dispatch(privateActionCreators.orderSuccess());
        })
        .catch(error => {
          dispatch(privateActionCreators.orderFailure(error));
        });
    };
  }
};
