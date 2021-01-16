/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_BILLS } from '../types';
const initialState = {
  bills: [],
  total: 0,
  bill: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_BILLS:
      return {
        ...state,
        bills: payload.data,
        total: payload.total,
      };
    default:
      return state;
  }
}
