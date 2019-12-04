import api from '../config/api';
import { actionCreators as authActions } from '../redux/Auth/actions';
import { myFirebase } from '../firebase';

import * as LocalStorageService from './LocalStorageService';

export const setCurrentUser = currentUser => {
  const { ma } = currentUser;
  api.setHeader('Authorization', ma);
  LocalStorageService.setSessionToken(ma);
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

export const recoverPassword = ({ email }) => myFirebase.auth().sendPasswordResetEmail(email);

export const signUp = ({ email, password }) => api.put('/api/auth/signup', { email, password });

export const edit = ({ email, password }) => api.post('/api/auth/editUser', { email, password });

export const hydrateCurrentUser = () => api.get('/api/auth/user');

export const singout = () => myFirebase.auth().signOut();
