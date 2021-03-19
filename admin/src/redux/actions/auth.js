import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../types';
import { authAPI } from '../../api';
import { notifySuccess, notifyErrors } from '../../utils/notify';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await authAPI.get_user();
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await authAPI.register(formData);
    notifySuccess(res.data.message);
  } catch (err) {
    notifyErrors(err);
  }
};
// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await authAPI.login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};
