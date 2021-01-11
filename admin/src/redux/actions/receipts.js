import api from '../../api';
import { GET_ALL_RECEIPTS, GET_ALL_RECEIPTS_DETAIL } from '../types';
import { message } from 'antd';

// get all receipts
export const getAllReceipts = (filter, page) => async (dispatch) => {
  try {
    const res = await api.get(`/receipts/?sort=${filter}&page=${page}`);
    dispatch({
      type: GET_ALL_RECEIPTS,
      payload: res.data,
    });
  } catch (err) {}
};

// get all receipts
export const getAllReceiptsDetails = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/receipts/${id}`);
    dispatch({
      type: GET_ALL_RECEIPTS_DETAIL,
      payload: res.data,
    });
  } catch (err) {}
};

// Add receipts
export const createReceipt = (data, note) => async (dispatch) => {
  try {
    const res = await api.post('/receipts', { data, note });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};
