import api from '../../api';
import { GET_ALL_TYPES, GET_TYPE_BY_ID } from '../types';
import { notification } from 'antd';

// Lấy loại sản phẩm theo typeId
export const getTypeById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/types/${id}`);
    dispatch({
      type: GET_TYPE_BY_ID,
      payload: res.data,
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

// Lấy loại sản phẩm theo catId
export const getTypesByCatId = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/types/categories/${id}`);
    dispatch({
      type: GET_ALL_TYPES,
      payload: res.data,
    });
  } catch (err) {}
};
