import api from '../../api';
import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
  RESTORE_CATEGORY,
  GET_ALL_CATEGORIES_REMOVED,
} from '../types';
import { message } from 'antd';

// get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await api.get('/categories');
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {}
};

// create category
export const createCategory = (data) => async (dispatch) => {
  try {
    const res = await api.post('/categories', data);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.data,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// edit category
export const editCategory = (data) => async (dispatch) => {
  try {
    const res = await api.put('/categories', data);
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data.data,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// remove category
export const removeCategory = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    dispatch({
      type: REMOVE_CATEGORY,
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

// restore category
export const restoreCategory = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`/categories/${id}/restore`);
    dispatch({
      type: RESTORE_CATEGORY,
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

// get all removed categories
export const getRemovedCategories = () => async (dispatch) => {
  try {
    const res = await api.get(`/categories/deleted`);
    dispatch({
      type: GET_ALL_CATEGORIES_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
