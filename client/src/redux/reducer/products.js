/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_PRODUCTS } from '../types';

const initialState = {
  products: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    default:
      return state;
  }
}
