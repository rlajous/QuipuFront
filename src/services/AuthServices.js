import api from '../config/api';
import { actionCreators as authActions } from '../redux/Auth/actions';
import { myFirebase } from '../firebase';

import * as LocalStorageService from './LocalStorageService';

export const setCurrentUser = currentUser => {
  api.setHeader('Authorization', currentUser);
  LocalStorageService.setSessionToken(currentUser);
};

export const getCurrentUser = () => {
  const currentSessionToken = LocalStorageService.getSessionToken();
  if (currentSessionToken) {
    api.setHeader('Authorization', currentSessionToken);
    return true;
  }
  return false;
};

export const removeCurrentUser = () => LocalStorageService.removeSessionToken();

export const authSetup = async dispatch => {
  const currentUser = await getCurrentUser();
  dispatch(authActions.init(currentUser));
};

export const login = ({ email, password }) => myFirebase.auth().signInWithEmailAndPassword(email, password);

export const edit = params => {
  api.post('/companies/edit', params);
  return { ok: true };
};

export const hydrateCurrentUser = () => {
  api.get('/company');
  return { ok: true, data: { sessionToken: 'logeado' } };
};
