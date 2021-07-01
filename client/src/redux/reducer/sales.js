/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_SALES_PRODUCTS } from '../types';

const initialState = {
  salesProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_SALES_PRODUCTS:
      return {
        ...state,
        salesProducts: payload,
      };
    default:
      return state;
  }
}
