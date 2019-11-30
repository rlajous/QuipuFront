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
  success: false
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
    case actions.PASSWORD: {
      return state.merge({
        password: action.payload
      });
    }
    case actions.CONFIRM_PASSWORD: {
      return state.merge({
        confirmPassword: action.payload
      });
    }
    case actions.EMAIL: {
      return state.merge({
        email: action.payload
      });
    }
    case actions.LOGIN: {
      return state.merge({ loading: true });
    }
    case actions.LOGIN_SUCCESS: {
      const { uid, email } = action.payload.authData;
      return state.merge({
        loading: false,
        currentUser: true,
        email,
        uid
      });
    }
    case actions.LOGIN_FAILURE: {
      return state.merge({
        loading: false,
        currentUser: null,
        company: null,
        err: action.payload.err
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
      return state.merge({ loading: true });
    }
    case actions.EDIT_SUCCESS: {
      return state.merge({
        loading: false,
        editSucces: true
      });
    }
    case actions.EDIT_FAILURE: {
      return state.merge({
        loading: false,
        editSucces: false,
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
  loading: PropTypes.bool.isRequired,
  initialLoading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
    // TODO: Extend user model definition
  })
};
