/* eslint-disable import/no-anonymous-default-export */
import { CART_LOADER, UPDATE_CART, REMOVE_CART } from '../types';

const initialState = {
  cartState: [],
  isHaveCart: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CART_LOADER:
    case UPDATE_CART:
      return {
        ...state,
        isHaveCart: payload.isHaveCart,
        cartState: payload.cartState,
      };
    case REMOVE_CART:
      return {
        ...state,
        cartState: [],
        isHaveCart: false,
      };
    default:
      return state;
  }
}
