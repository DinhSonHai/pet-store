import api from '../../api';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR } from '../types';
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

// Login with google account
export const loginGoogle = (idToken) => async (dispatch) => {
  try {
    const res = await api.post('/auth/googlelogin', { idToken });
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

// Login with facebook account
export const loginFacebook = (userID, accessToken) => async (dispatch) => {
  try {
    const res = await api.post('/auth/facebooklogin', { userID, accessToken });
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
    await api.put('/auth/update_user', data);
    dispatch(loadUser());
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
export const addAdress = (data) => async (dispatch) => {
  try {
    await api.put('/auth/add_address', data);

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

// Remove address for user
export const removeAdress = (address_id) => async (dispatch) => {
  try {
    await api.put('/auth/remove_address', { address_id });
    dispatch(loadUser());
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
export const updateAdress = (data) => async (dispatch) => {
  try {
    await api.put('/auth/update_address', data);
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

// Add/Remove favorite product
export const updateFavorite = (productId) => async (dispatch) => {
  try {
    const res = await api.put('/auth/favorite', { productId });
    dispatch(loadUser());
    return res.data.check;
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

// Get favorite products
export const getFavorite = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/favorite');
    return res.data;
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

// Get favorite products
export const getPurchased = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/purchased');
    return res.data;
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
