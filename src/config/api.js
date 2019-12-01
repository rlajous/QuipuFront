import { create } from 'apisauce';
import { actionCreators as userActions } from '../redux/Auth/actions';

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
      dispatch(userActions.logout())
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      dispatch(userActions.logout())
    }
  });
};

export default api;
