/* eslint-disable import/no-anonymous-default-export */
import {
  GET_GUEST_INFO,
  UPDATE_GUEST_INFO,
  CLEAR_CHECKOUT_INFO,
  UPDATE_AUTH_INFO,
  GET_AUTH_INFO,
  UPDATE_AUTH_ADDRESS,
} from '../types';

const initialState = {
  guestState: null,
  authState: null,
  isCheckedOut: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GUEST_INFO:
      return {
        ...state,
        guestState: payload,
        isCheckedOut: true,
      };
    case GET_AUTH_INFO:
      return {
        ...state,
        authState: { ...state.authState, ...payload },
        isCheckedOut: true,
      };
    case UPDATE_GUEST_INFO:
      return {
        ...state,
        guestState: {
          ...state.guestState,
          deliveryState: payload.deliveryState,
          paymentState: payload.paymentState,
          totalMoney: payload.totalMoney,
        },
      };
    case UPDATE_AUTH_INFO:
      return {
        ...state,
        authState: {
          ...state.authState,
          deliveryState: payload.deliveryState,
          paymentState: payload.paymentState,
          totalMoney: payload.totalMoney,
        },
      };
    case UPDATE_AUTH_ADDRESS:
      return {
        ...state,
        authState: {
          ...state.authState,
          address: payload.address,
        },
      };
    case CLEAR_CHECKOUT_INFO:
      return {
        ...state,
        guestState: null,
        authState: null,
        isCheckedOut: false,
      };
    default:
      return state;
  }
}
