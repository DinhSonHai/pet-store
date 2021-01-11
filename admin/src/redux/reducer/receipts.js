/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_RECEIPTS, GET_ALL_RECEIPTS_DETAIL } from '../types';

const initialState = {
  receipts: [],
  receipts_detail: [],
  total: 0,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_RECEIPTS:
      return {
        ...state,
        receipts: payload.data,
        total: payload.total,
      };
    case GET_ALL_RECEIPTS_DETAIL:
      return {
        ...state,
        receipts_detail: payload,
      };
    default:
      return state;
  }
}
