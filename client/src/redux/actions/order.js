import api from '../../api';
import { loadUser } from './auth';
import { notification, message } from 'antd';

// Đặt hàng vai trò khách
export const orderProducts = (data) => async (dispatch) => {
  try {
    const res = await api.post('/orders', data);
    notification.open({
      message: 'Đặt hàng Thành công!',
      description: res.data.message,
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

// Đặt hàng vai trò người dùng
export const orderProductsAuth = (data) => async (dispatch) => {
  try {
    const res = await api.post('/orders/auth', data);
    dispatch(loadUser());
    notification.open({
      message: 'Đặt hàng Thành công!',
      description: res.data.message,
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

// Lấy đơn hàng bị hủy
export const getCaneledOrders = () => async (dispatch) => {
  try {
    const res = await api.get('/orders/orders_canceled/auth');
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

//Lấy đơn hàng hoàn tất
export const getCompletedOrders = () => async (dispatch) => {
  try {
    const res = await api.get('/orders/orders_completed/auth');
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

// Lấy đơn hàng đang xử lí
export const getProcessingOrders = () => async (dispatch) => {
  try {
    const res = await api.get('/orders/orders_processing/auth');
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

// Lấy đơn hàng theo orderId phía người dùng
export const getOrderById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/orders/auth/${id}`);
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

// Lấy chi tiết đơn hàng theo orderId phía người dùng
export const getOrderDetailById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/orders/detail/auth/${id}`);
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
// Hủy đơn hàng phía người dùng
export const cancelOrderById = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/orders/auth/${id}`);
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};
