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

// Send request for reset pwd
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await authAPI.forgot_password(email);
    notifySuccess(res.data.message);
  } catch (err) {
    notifyErrors(err);
  }
};

// Send request for reset pwd
export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await authAPI.reset_password(data);
    notifySuccess(res.data.message);
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};