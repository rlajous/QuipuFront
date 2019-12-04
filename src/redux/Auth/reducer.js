import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { getCurrentUser } from '../../services/AuthServices';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  currentUser: getCurrentUser(),
  user: null,
  loading: false,
  initialLoading: true,
  email: '',
  password: '',
  confirmPassword: '',
  err: null,
  uid: null,
  success: false,
  editLoading: false,
  loginErr: null
};

/* eslint-disable complexity */
// eslint-disable-next-line new-cap
export function reducer(state = Immutable(defaultState), action) {
  switch (action.type) {
    case actions.AUTH_INIT: {
      return state.merge({
        initialLoading: false,
        currentUser: action.payload.user
      });
    }
    case actions.LOGIN: {
      return state.merge({ loading: true, loginErr: null });
    }
    case actions.LOGIN_SUCCESS: {
      return state.merge({
        loading: false,
        currentUser: true
      });
    }
    case actions.LOGIN_FAILURE: {
      return state.merge({
        loading: false,
        currentUser: null,
        loginErr: action.payload.err
      });
    }
    case actions.RECOVER_PASSWORD: {
      return state.merge({ loading: true });
    }
    case actions.RECOVER_PASSWORD_SUCCESS: {
      return state.merge({
        loading: false,
        success: true
      });
    }
    case actions.RECOVER_PASSWORD_FAILURE: {
      return state.merge({
        loading: false,
        err: action.payload.err
      });
    }
    case actions.SIGN_UP: {
      return state.merge({ loading: true });
    }
    case actions.SIGN_UP_SUCCESS: {
      return state.merge({
        loading: false
      });
    }
    case actions.SIGN_UP_FAILURE: {
      return state.merge({
        loading: false,
        err: action.payload.err
      });
    }
    case actions.EDIT: {
      return state.merge({ editLoading: true, success: false, err: null });
    }
    case actions.EDIT_SUCCESS: {
      return state.merge({
        editLoading: false,
        success: true
      });
    }
    case actions.EDIT_FAILURE: {
      return state.merge({
        editLoading: false,
        success: false,
        err: action.payload.err
      });
    }
    case actions.USER: {
      return state.merge({ loading: true });
    }
    case actions.USER_SUCCESS: {
      return state.merge({
        loading: false,
        user: action.payload.authData
      });
    }
    case actions.USER_FAILURE: {
      return state.merge({
        loading: false,
        company: null,
        err: action.payload.err
      });
    }
    case actions.LOGOUT: {
      return state.merge({ loading: false, currentUser: null });
    }
    default: {
      return state;
    }
  }
}
/* eslint-enable complexity */

/* ------------- Auth propTypes ------------- */
export const propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    tokens: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired
  })
};
