import api from '../../api';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../types';
import { notification } from 'antd';

// Lấy sản phẩm theo typeId
export const getProductsByType = (id, filterValue, page) => async (
  dispatch
) => {
  try {
    const res = await api.get(
      `/products/types/${id}/?sort=${filterValue}&page=${page}`
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

// Lấy sản phẩm theo id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/products/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
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

//Lấy sản phẩm theo từ khóa
export const getSearchProductsList = (q, filterValue, page) => async (
  dispatch
) => {
  try {
    const res = await api.get(
      `/products/search?q=${q}&sort=${filterValue}&page=${page}`
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) { }
};

