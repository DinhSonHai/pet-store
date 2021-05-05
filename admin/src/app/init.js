import store from './store';
import api from '../api';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../redux/actions/auth';
import { LOGOUT, AUTH_ERROR } from '../redux/types';
const initApp = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  } else {
    store.dispatch({ type: AUTH_ERROR });
  }
  window.addEventListener('storage', () => {
    if (
      !localStorage.token ||
      api.defaults.headers.common['x-auth-token'] !== localStorage.token
    ) {
      store.dispatch({ type: LOGOUT });
    }
  });
};

export default initApp;
