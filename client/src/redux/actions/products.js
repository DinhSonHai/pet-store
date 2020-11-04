import api from '../../api';
import { GET_ALL_PRODUCTS } from '../types';

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await api.get('/products');
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: PRODUCTS_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};
