import * as transactionsService from '../../services/TransactionsService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['PAGE', 'HYDRATE_TRANSACTIONS', 'HYDRATE_TRANSACTIONS_SUCCESS', 'HYDRATE_TRANSACTIONS_FAILURE'],
  '@@TRANSACTIONS'
);

const privateActionCreators = {
  hydrateTransactionsSuccess(transactions) {
    return {
      type: actions.HYDRATE_TRANSACTIONS_SUCCESS,
      payload: transactions
    };
  },
  hydrateTransactionsFailure(err) {
    return {
      type: actions.HYDRATE_TRANSACTIONS_FAILURE,
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
  hydrateTransactions(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_TRANSACTIONS });
      try {
        const response = await transactionsService.getTransactions(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateTransactionsSuccess(response.data));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateTransactionsFailure(e));
      }
    };
  }
};
