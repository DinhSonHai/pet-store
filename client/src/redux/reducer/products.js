/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_PRODUCTS,
  GET_BESTSELLER_PRODUCTS,
  GET_POPULAR_PRODUCTS,
  GET_NEWEST_PRODUCTS,
  GET_PRODUCT_BY_ID,
} from "../types";

const initialState = {
  products: [],
  popularProducts: [],
  newestProducts: [],
  bestsellerProducts: [],
  total: 0,
  product: null,
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
    case GET_BESTSELLER_PRODUCTS:
      return {
        ...state,
        bestsellerProducts: payload,
      };
    case GET_NEWEST_PRODUCTS:
      return {
        ...state,
        newestProducts: payload,
      };
    case GET_POPULAR_PRODUCTS:
      return {
        ...state,
        popularProducts: payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: payload,
      };
    default:
      return state;
  }
}
