import api from '../../api';
import { LOGIN_SUCCESS } from '../types';
import { notification } from 'antd';
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
