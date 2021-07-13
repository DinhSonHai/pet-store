import { GET_ALL_SALES_PRODUCTS, REMOVE_SALES_PRODUCTS } from '../types';
import { saleAPI } from '../../api';
import { notifyErrors } from '../../utils/notify';

// Lấy tất cả sản phẩm khuyến mãi
export const getAllSalesProducts = () => async (dispatch) => {
  try {
    const res = await saleAPI.get_all_sales_products();
    dispatch({
      type: GET_ALL_SALES_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REMOVE_SALES_PRODUCTS,
    });
  }
};