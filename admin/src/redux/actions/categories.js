import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
  RESTORE_CATEGORY,
  GET_ALL_CATEGORIES_REMOVED,
} from '../types';
import { notifyActions } from '../../utils/notify';
import { categoryAPI } from '../../api';

// get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await categoryAPI.get_all();
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {}
};

// create category
export const createCategory = (data) => async (dispatch) => {
  try {
    const res = await categoryAPI.create(data);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.data,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

// edit category
export const editCategory = (data) => async (dispatch) => {
  try {
    const res = await categoryAPI.update(data);
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data.data,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

// remove category
export const removeCategory = (id) => async (dispatch) => {
  try {
    const res = await categoryAPI.remove(id);
    dispatch({
      type: REMOVE_CATEGORY,
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

// restore category
export const restoreCategory = (id) => async (dispatch) => {
  try {
    const res = await categoryAPI.restore(id);
    dispatch({
      type: RESTORE_CATEGORY,
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

// get all removed categories
export const getRemovedCategories = () => async (dispatch) => {
  try {
    const res = await categoryAPI.get_removed();
    dispatch({
      type: GET_ALL_CATEGORIES_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
