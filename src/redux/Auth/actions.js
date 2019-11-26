import { push } from 'connected-react-router';

import * as AuthService from '../../services/AuthServices';
import Routes from '../../constants/routes';
import { stringArrayToObject } from '../../utils/array';

/* ------------- Auth actions ------------- */
export const actions = stringArrayToObject(
  [
    'LOGIN',
    'LOGIN_SUCCESS',
    'LOGIN_FAILURE',
    'COMPANY',
    'COMPANY_SUCCESS',
    'COMPANY_FAILURE',
    'LOGOUT',
    'AUTH_INIT',
    'PASSWORD',
    'EMAIL',
    'EDIT',
    'EDIT_SUCCESS',
    'EDIT_FAILURE'
  ],
  '@@AUTH'
);

const privateActionCreators = {
  loginSuccess(authData) {
    return {
      type: actions.LOGIN_SUCCESS,
      payload: { authData }
    };
  },
  loginFailure(err) {
    return {
      type: actions.LOGIN_FAILURE,
      payload: { err }
    };
  },
  editSuccess(authData) {
    return {
      type: actions.EDIT_SUCCESS,
      payload: { authData }
    };
  },
  editFailure(err) {
    return {
      type: actions.EDIT_FAILURE,
      payload: { err }
    };
  },
  companySuccess(authData) {
    return {
      type: actions.COMPANY_SUCCESS,
      payload: { authData }
    };
  },
  companyFailure(err) {
    return {
      type: actions.COMPANY_FAILURE,
      payload: { err }
    };
  }
};

export const actionCreators = {
  init(user) {
    return {
      type: actions.AUTH_INIT,
      payload: { user }
    };
  },
  handlePasswordChange(password) {
    return {
      type: actions.PASSWORD,
      payload: password
    };
  },
  handleEmailChange(email) {
    return {
      type: actions.EMAIL,
      payload: email
    };
  },
  login(authData) {
    return async dispatch => {
      dispatch({ type: actions.LOGIN });
      try {
        const response = await AuthService.login(authData);
        if (response.ok) {
          await AuthService.setCurrentUser(response.data);
          dispatch(privateActionCreators.loginSuccess(response.data));
          dispatch(push(Routes.Profile));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.loginFailure(e));
      }
    };
  },
  edit(authData) {
    return async dispatch => {
      dispatch({ type: actions.EDIT });
      try {
        const response = await AuthService.edit(authData);
        if (response.ok) {
          dispatch(privateActionCreators.editSuccess(response.data));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.editFailure(e));
      }
    };
  },
  hydrateCompany() {
    return async dispatch => {
      dispatch({ type: actions.COMPANY });
      try {
        const response = await AuthService.hydrateCurrentUser();
        if (response.ok) {
          dispatch(privateActionCreators.companySuccess(response.data));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.companyFailure(e));
      }
    };
  },
  logout() {
    return async dispatch => {
      await AuthService.removeCurrentUser();
      dispatch({ type: actions.LOGOUT });
      dispatch(push(Routes.Login));
    };
  }
};
