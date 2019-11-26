import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import { getCurrentUser } from '../../services/AuthServices';

import { actions } from './actions';

/* ------------- Auth reducer ------------- */
const defaultState = {
  currentUser: getCurrentUser(),
  company: null,
  loading: false,
  initialLoading: true,
  email: '',
  password: '',
  err: null
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
    case actions.EMAIL: {
      return state.merge({
        email: action.payload
      });
    }
    case actions.LOGIN: {
      return state.merge({ loading: true });
    }
    case actions.LOGIN_SUCCESS: {
      return state.merge({
        loading: false,
        currentUser: action.payload.authData
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
    case actions.COMPANY: {
      return state.merge({ loading: true });
    }
    case actions.COMPANY_SUCCESS: {
      return state.merge({
        loading: false,
        company: action.payload.authData
      });
    }
    case actions.COMPANY_FAILURE: {
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
