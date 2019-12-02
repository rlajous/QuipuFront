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
    'USER',
    'USER_SUCCESS',
    'USER_FAILURE',
    'LOGOUT',
    'RECOVER_PASSWORD',
    'RECOVER_PASSWORD_SUCCESS',
    'RECOVER_PASSWORD_FAILURE',
    'SIGN_UP',
    'SIGN_UP_SUCCESS',
    'SIGN_UP_FAILURE',
    'AUTH_INIT',
    'PASSWORD',
    'CONFIRM_PASSWORD',
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
  recoverPasswordSuccess() {
    return {
      type: actions.RECOVER_PASSWORD_SUCCESS
    };
  },
  recoverPasswordFailure(err) {
    return {
      type: actions.RECOVER_PASSWORD_FAILURE,
      payload: { err }
    };
  },
  signUpSuccess() {
    return {
      type: actions.SIGN_UP_SUCCESS
    };
  },
  signUpFailure(err) {
    return {
      type: actions.SIGN_UP_FAILURE,
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
  userSuccess(authData) {
    return {
      type: actions.USER_SUCCESS,
      payload: { authData }
    };
  },
  userFailure(err) {
    return {
      type: actions.USER_FAILURE,
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
  handleConfirmPasswordChange(password) {
    return {
      type: actions.CONFIRM_PASSWORD,
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
      await AuthService.login(authData)
        .then(async user => {
          await AuthService.setCurrentUser(user.user);
          dispatch(privateActionCreators.loginSuccess(user.user));
          dispatch(push(Routes.Wallet));
        })
        .catch(error => {
          dispatch(privateActionCreators.loginFailure(error));
        });
    };
  },
  signUp(authData) {
    return async dispatch => {
      dispatch({ type: actions.SIGN_UP });
      try {
        const response = await AuthService.signUp(authData);
        if (response.ok) {
          dispatch(privateActionCreators.signUpSuccess());
          dispatch(push(Routes.Login));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.signUpFailure(e));
      }
    };
  },
  recoverPassword(authData) {
    return async dispatch => {
      dispatch({ type: actions.RECOVER_PASSWORD });
      await AuthService.recoverPassword(authData)
        .then(() => {
          dispatch(privateActionCreators.recoverPasswordSuccess());
        })
        .catch(error => {
          dispatch(privateActionCreators.recoverPasswordFailure(error));
        });
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
  hydrateUser() {
    return async dispatch => {
      dispatch({ type: actions.USER });
      try {
        const response = await AuthService.hydrateCurrentUser();
        if (response.ok) {
          console.log(response.data);
          dispatch(privateActionCreators.userSuccess(response.data));
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (e) {
        dispatch(privateActionCreators.userFailure(e));
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
