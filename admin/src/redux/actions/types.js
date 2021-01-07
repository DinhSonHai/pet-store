import api from '../../api';
import {
  GET_ALL_TYPES,
  REMOVE_TYPE,
  RESTORE_TYPE,
  GET_ALL_TYPES_REMOVED,
} from '../types';
import { message } from 'antd';

// get all types
export const getAllTypes = () => async (dispatch) => {
  try {
    const res = await api.get('/types');
    dispatch({
      type: GET_ALL_TYPES,
      payload: res.data,
    });
  } catch (err) {}
};

// create type
export const createType = (data) => async (dispatch) => {
  try {
    const res = await api.post('/types', data);
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// edit type
export const editType = (data) => async (dispatch) => {
  try {
    const res = await api.put('/types', data);
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// remove type
export const removeType = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/types/${id}`);
    dispatch({
      type: REMOVE_TYPE,
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

// restore type
export const restoreType = (id) => async (dispatch) => {
  try {
    const res = await api.patch(`/types/${id}/restore`);
    dispatch({
      type: RESTORE_TYPE,
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

// get all removed types
export const getRemovedTypes = () => async (dispatch) => {
  try {
    const res = await api.get(`/types/deleted`);
    dispatch({
      type: GET_ALL_TYPES_REMOVED,
      payload: res.data,
    });
  } catch (err) {}
};
