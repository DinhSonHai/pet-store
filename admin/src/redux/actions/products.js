import api from '../../api';
import {
  GET_ALL_PRODUCTS,
  REMOVE_PRODUCT,
  RESTORE_PRODUCT,
  GET_ALL_PRODUCTS_REMOVED,
} from '../types';
import { message } from 'antd';

// get all products
export const getAllProducts = (filter, page) => async (dispatch) => {
  try {
    const res = await api.get(`/products/?sort=${filter}&page=${page}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

// create product
export const createProduct = (data) => async (dispatch) => {
  try {
    const res = await api.post('/products', data);
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// edit product
export const editProduct = (data) => async (dispatch) => {
  try {
    const res = await api.put('/products', data);
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// remove product
export const removeProduct = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/products/${id}`);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// restore product
export const restoreProduct = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`/products/${id}/restore`);
    dispatch({
      type: RESTORE_PRODUCT,
      payload: id,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// get all removed products
export const getRemovedProducts = (page) => async (dispatch) => {
  try {
    const res = await api.get(`/products/deleted/?page=${page}`);
    dispatch({
      type: GET_ALL_PRODUCTS_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
