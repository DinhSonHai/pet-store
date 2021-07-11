import { authAPI, promoAPI } from '../../api';
import { notifySuccess, notifyErrors } from '../../utils/notify';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../types';
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
// Activate User
export const activate = (token) => async (dispatch) => {
  try {
    const res = await authAPI.activate(token);
    notifySuccess(res.data.message);
    return true;
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

// Login with google account
export const loginGoogle = (idToken) => async (dispatch) => {
  try {
    const res = await authAPI.login_google(idToken);
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

// Login with facebook account
export const loginFacebook = (userID, accessToken) => async (dispatch) => {
  try {
    const res = await authAPI.login_facebook({ userID, accessToken });
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

// update user info
export const updateUserInfo = (data) => async (dispatch) => {
  try {
    await authAPI.update(data);
    dispatch(loadUser());
    notifySuccess('Cập nhật thông tin thành công!');
  } catch (err) {
    notifyErrors(err);
  }
};

// Add address for user
export const addAdress = (data) => async (dispatch) => {
  try {
    await authAPI.add_address(data);
    dispatch(loadUser());
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};

// Remove address for user
export const removeAdress = (address_id) => async (dispatch) => {
  try {
    await authAPI.remove_address(address_id);
    dispatch(loadUser());
  } catch (err) {
    notifyErrors(err);
  }
};

// Update address for user
export const updateAdress = (data) => async (dispatch) => {
  try {
    await authAPI.update_address(data);
    dispatch(loadUser());
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};

// Add/Remove favorite product
export const updateFavorite = (productId) => async (dispatch) => {
  try {
    const res = await authAPI.action_favorite(productId);
    dispatch(loadUser());
    return res.data.check;
  } catch (err) {
    notifyErrors(err);
  }
};

// Get favorite products
export const getFavorite = () => async (dispatch) => {
  try {
    const res = await authAPI.get_favorite();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Get favorite products
export const getPurchased = () => async (dispatch) => {
  try {
    const res = await authAPI.get_purchased();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Get promos
export const getPromos = () => async (dispatch) => {
  try {
    const res = await promoAPI.get_all();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Get promo by name
export const getPromoByName = (name) => async (dispatch) => {
  try {
    const res = await promoAPI.apply(name);
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};