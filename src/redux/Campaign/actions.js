import * as CampaignService from '../../services/CampaignService';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  ['HYDRATE_CAMPAIGN', 'HYDRATE_CAMPAIGN_SUCCESS', 'HYDRATE_CAMPAIGN_FAILURE'],
  '@@CAMPAIGN'
);

const privateActionCreators = {
  hydrateCampaignSuccess(authData) {
    return {
      type: actions.HYDRATE_CAMPAIGN_SUCCESS,
      payload: authData
    };
  },
  hydrateCampaignFailure(err) {
    return {
      type: actions.HYDRATE_CAMPAIGN_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  hydrateCampaign() {
    return async dispatch => {
      dispatch({ type: actions.HYDRATE_CAMPAIGN });
      try {
        const response = await CampaignService.getCampaign();

        if (response.ok) {
          dispatch(privateActionCreators.hydrateCampaignSuccess(response.data));
        }
      } catch (e) {
        dispatch(privateActionCreators.hydrateCampaignFailure(e));
      }
    };
  }
};
