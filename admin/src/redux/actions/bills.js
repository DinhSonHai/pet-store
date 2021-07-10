import { GET_ALL_BILLS } from '../types';
import { billAPI } from '../../api';

export const getAllBills = (page, from, to) => async (dispatch) => {
  try {
    const res = await billAPI.get_all(page, from, to);
    dispatch({
      type: GET_ALL_BILLS,
      payload: res.data,
    });
  } catch (err) {}
};
