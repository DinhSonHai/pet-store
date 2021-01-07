/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_REMOVED,
  REMOVE_PRODUCT,
  RESTORE_PRODUCT,
} from '../types';

const initialState = {
  products: [],
  products_removed: [],
  total: 0,
  total_removed: 0,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload.data,
        total: payload.total,
      };
    case GET_ALL_PRODUCTS_REMOVED:
      return {
        ...state,
        products_removed: payload.data,
        total_removed: payload.total,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p._id !== payload),
      };
    case RESTORE_PRODUCT:
      return {
        ...state,
        products_removed: state.products_removed.filter(
          (p) => p._id !== payload
        ),
      };
    default:
      return state;
  }
}
