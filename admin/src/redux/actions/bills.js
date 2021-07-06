import { GET_ALL_BILLS } from '../types';
import { billAPI } from '../../api';

export const getAllBills = (page) => async (dispatch) => {
  try {
    const res = await billAPI.get_all(page);
    dispatch({
      type: GET_ALL_BILLS,
      payload: res.data,
    });
  } catch (err) {}
};
