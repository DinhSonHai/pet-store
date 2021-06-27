/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_OFFERS,
} from '../types';

const initialState = {
  offers: [],
  total: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_OFFERS:
      return {
        ...state,
        offers: payload.data,
        total: payload.total
      };
    default:
      return state;
  }
}
