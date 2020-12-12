import api from '../../api';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, UPDATE_USER } from '../types';
import { notification } from 'antd';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/user');
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
    const res = await api.post('/auth/signup', formData);
    notification.open({
      message: 'Đăng ký thành công!',
      description: res.data.message,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};
// Activate User
export const activate = (token) => async (dispatch) => {
  try {
    const res = await api.post('/auth/activate', token);
    notification.open({
      message: 'Thành công!',
      description: res.data.message,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};
// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth/signin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// Send request for reset pwd
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await api.put('/auth/forgotpassword', email);
    notification.open({
      message: 'Thành công!',
      description: res.data.message,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// Send request for reset pwd
export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await api.put('/auth/resetpassword', data);
    notification.open({
      message: 'Thành công!',
      description: res.data.message,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// update user info
export const updateUserInfo = (data) => async (dispatch) => {
  try {
    const res = await api.put('/auth/update_user', data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    loadUser();
    notification.open({
      message: 'Thành công!',
      description: 'Cập nhật thông tin thành công!',
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// Add address for user
export const AddAdress = (data) => async (dispatch) => {
  try {
    const res = await api.put('/auth/add_address', data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    loadUser();
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// Remove address for user
export const RemoveAdress = (address_id) => async (dispatch) => {
  try {
    const res = await api.put('/auth/remove_address', { address_id });
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};

// Update address for user
export const UpdateAdress = (data) => async (dispatch) => {
  try {
    const res = await api.put('/auth/update_address', data);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    loadUser();
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        notification.open({
          message: 'Lỗi!',
          description: error.msg,
        })
      );
    }
  }
};
