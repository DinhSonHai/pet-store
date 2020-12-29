import api from '../../api';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../types';

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

// Get products by Type
export const getProductsByType = (id, filterValue, page) => async (
  dispatch
) => {
  try {
    const res = await api.get(
      `/products/types/${id}/?sort=${filterValue}&page=${page}`
    );
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

// Get product by id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/products/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {}
};

// Get all types by catId
export const getTypesByCatId = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/types/categories/${id}`);
    return res.data;
  } catch (err) {}
};
