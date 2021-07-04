import {
  GET_ALL_TYPES,
  REMOVE_TYPE,
  RESTORE_TYPE,
  GET_ALL_TYPES_REMOVED,
} from '../types';
import { typeAPI } from '../../api';
import { notifyActions } from '../../utils/notify';

// get all types
export const getAllTypes = () => async (dispatch) => {
  try {
    const res = await typeAPI.get_all();
    dispatch({
      type: GET_ALL_TYPES,
      payload: res.data,
    });
  } catch (err) {}
};

// create type
export const createType = (data) => async (dispatch) => {
  try {
    const res = await typeAPI.create(data);
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

// edit type
export const editType = (id, data) => async (dispatch) => {
  try {
    const res = await typeAPI.update(id, data);
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

// remove type
export const removeType = (id) => async (dispatch) => {
  try {
    const res = await typeAPI.remove(id);
    dispatch({
      type: REMOVE_TYPE,
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

// restore type
export const restoreType = (id) => async (dispatch) => {
  try {
    const res = await typeAPI.restore(id);
    dispatch({
      type: RESTORE_TYPE,
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

// get all removed types
export const getRemovedTypes = () => async (dispatch) => {
  try {
    const res = await typeAPI.get_removed();
    dispatch({
      type: GET_ALL_TYPES_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
