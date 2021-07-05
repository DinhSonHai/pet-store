/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_PROMOS, REMOVE_PROMO } from "../types";

const initialState = {
  promos: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PROMOS:
      return {
        ...state,
        promos: payload,
      };
    case REMOVE_PROMO:
      return {
        ...state,
        promos: state.promos.filter((item) => item._id !== payload),
      };
    default:
      return state;
  }
}
