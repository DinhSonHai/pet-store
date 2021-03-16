import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../types';
import { productAPI } from '../../api';
import { notifyErrors } from '../../utils/notify';

// Lấy sản phẩm theo typeId
export const getProductsByType = (id, filterValue, page) => async (
  dispatch
) => {
  try {
    const res = await productAPI.get_by_type(id, filterValue, page);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};

// Lấy sản phẩm theo id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await productAPI.get_by_id(id);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    notifyErrors(err);
  }
};

//Lấy sản phẩm theo từ khóa
export const getSearchProductsList = (q, filterValue, page) => async (
  dispatch
) => {
  try {
    const res = await productAPI.get_by_searching(q, filterValue, page);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {}
};
