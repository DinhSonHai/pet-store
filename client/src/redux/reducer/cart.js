/* eslint-disable import/no-anonymous-default-export */
import { CART_LOADER, UPDATE_CART, REMOVE_CART, CONFIRM_CART } from '../types';

const initialState = {
  cartState: [],
  isCheckedOut: false,
  isHaveCart: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CART_LOADER:
    case UPDATE_CART:
      return {
        ...state,
        loading: false,
        isHaveCart: payload.isHaveCart,
        cartState: payload.cartState,
      };
    case REMOVE_CART:
      return {
        ...state,
        cartState: [],
        isCheckedOut: false,
        isHaveCart: false,
        loading: false,
      };
    case CONFIRM_CART:
      return {
        ...state,
        isCheckedOut: true,
      };
    default:
      return state;
  }
}
