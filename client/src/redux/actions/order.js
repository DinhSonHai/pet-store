import api from '../../api';
import { notification } from 'antd';

export const orderProducts = (data) => async (dispatch) => {
  try {
    const res = await api.post('/order', data);
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

export const orderProductsAuth = (data) => async (dispatch) => {
  try {
    const res = await api.post('/order/auth', data);
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
