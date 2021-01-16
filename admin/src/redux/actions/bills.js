import api from '../../api';
import { GET_ALL_BILLS } from '../types';

export const getAllBills = () => async (dispatch) => {
  try {
    const res = await api.get('/bills');
    dispatch({
      type: GET_ALL_BILLS,
      payload: res.data,
    });
  } catch (err) {}
};
