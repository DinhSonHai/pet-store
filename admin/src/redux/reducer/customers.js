/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_CUSTOMERS } from "../types";

const initialState = {
  customers: [],
  total: 0,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: payload.data,
        total: payload.total,
      };
    default:
      return state;
  }
}
