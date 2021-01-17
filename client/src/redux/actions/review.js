import api from '../../api';
import { notification } from 'antd';

export const review = (data, id) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/${id}/review`, data);
    notification.open({
      message: 'Thông báo',
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

export const getReviewByProductId = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/${id}/review`);
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
