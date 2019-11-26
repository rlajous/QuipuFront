import { create } from 'apisauce';

const STATUS_CODES = {
  unauthorized: 401
};

const api = create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000
});

// eslint-disable-next-line no-unused-vars, prettier/prettier
export const apiSetup = dispatch => {
  api.addMonitor(response => {
    if (response.status === STATUS_CODES.unauthorized) {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
       */
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
    }
  });
};

export default api;
