import { GET_ALL_SALES_PRODUCTS } from '../types';
import { saleAPI } from '../../api';
import { notifyErrors } from '../../utils/notify';

// Lấy tat ca san pham khuyen mai
export const getAllSalesProducts = () => async (dispatch) => {
  try {
    const res = await saleAPI.get_all_sales_products();
    dispatch({
      type: GET_ALL_SALES_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    notifyErrors(err);
  }
};