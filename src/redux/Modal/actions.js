import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(['SELL_MODAL', 'BUY_MODAL'], '@@MODAL');

export const actionCreators = {
  handleSellModalChange(bool) {
    return {
      type: actions.SELL_MODAL,
      payload: { bool }
    };
  },
  handleBuyModalChange(bool) {
    return {
      type: actions.BUY_MODAL,
      payload: { bool }
    };
  }
};
