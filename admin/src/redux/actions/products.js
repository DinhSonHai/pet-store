import {
  GET_ALL_PRODUCTS,
  REMOVE_PRODUCT,
  RESTORE_PRODUCT,
  GET_ALL_PRODUCTS_REMOVED,
} from '../types';
import { productAPI } from '../../api';
import { notifyActions } from '../../utils/notify';
// get all products
export const getAllProducts = (filter, page) => async (dispatch) => {
  try {
    const res = await productAPI.get_all(filter, page);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

// create product
export const createProduct = (data) => async (dispatch) => {
  try {
    const res = await productAPI.create(data);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
    return false;
  }
};

// edit product
export const editProduct = (id, data) => async (dispatch) => {
  try {
    const res = await productAPI.update(id, data);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
    return false;
  }
};

// remove product
export const removeProduct = (id) => async (dispatch) => {
  try {
    const res = await productAPI.remove(id);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

// restore product
export const restoreProduct = (id) => async (dispatch) => {
  try {
    const res = await productAPI.restore(id);
    dispatch({
      type: RESTORE_PRODUCT,
      payload: id,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

// get all removed products
export const getRemovedProducts = (page) => async (dispatch) => {
  try {
    const res = await productAPI.get_removed(page);
    dispatch({
      type: GET_ALL_PRODUCTS_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
