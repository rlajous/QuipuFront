import { stringArrayToObject } from '../../utils/array';
import * as StatisticsService from '../../services/StatisticsService';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['FILTER', 'HYDRATE_STATISTICS', 'HYDRATE_STATISTICS_SUCCESS', 'HYDRATE_STATISTICS_FAILURE'],
  '@@STATISTICS'
);

const privateActionCreators = {
  filterSuccess(authData) {
    return {
      type: actions.FILTER,
      payload: { authData }
    };
  },
  hydrateStatisticsSuccess(authData) {
    return {
      type: actions.HYDRATE_STATISTICS_SUCCESS,
      payload: authData
    };
  },
  hydrateStatisticsFailure(err) {
    return {
      type: actions.HYDRATE_STATISTICS_FAILURE,
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
  hydrateStatistics(filter) {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_STATISTICS });
      try {
        const response = await StatisticsService.getStatistics(filter);
        if (response.ok) {
          dispatch(privateActionCreators.hydrateStatisticsSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateStatisticsFailure(e));
      }
    };
  }
};
