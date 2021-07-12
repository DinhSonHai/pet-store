import { GET_ALL_RECEIPTS, GET_ALL_RECEIPTS_DETAIL } from '../types';
import { receiptAPI } from '../../api';
import { notifyActions } from '../../utils/notify';
// get all receipts
export const getAllReceipts = (filter, page) => async (dispatch) => {
  try {
    const res = await receiptAPI.get_all(filter, page);
    dispatch({
      type: GET_ALL_RECEIPTS,
      payload: res.data,
    });
  } catch (err) {}
};

// get all receipts
export const getAllReceiptsDetails = (id) => async (dispatch) => {
  try {
    const res = await receiptAPI.get_details(id);
    dispatch({
      type: GET_ALL_RECEIPTS_DETAIL,
      payload: res.data,
    });
  } catch (err) {}
};

// Add receipts
export const createReceipt = (data, note) => async (dispatch) => {
  try {
    const res = await receiptAPI.create(data, note);
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
