/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_TYPES, GET_TYPE_BY_ID } from '../types';

const initialState = {
  types: [],
  product: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TYPES:
      return {
        ...state,
        types: payload,
      };
    case GET_TYPE_BY_ID:
      return {
        ...state,
        type: payload,
      };
    default:
      return state;
  }
}
