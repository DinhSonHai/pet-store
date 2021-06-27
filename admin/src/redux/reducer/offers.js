/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_OFFERS, GET_OFFER_BY_ID,
} from '../types';

const initialState = {
  offer: {},
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
    case GET_OFFER_BY_ID:
      return {
        ...state,
        offer: payload,
      }
    default:
      return state;
  }
}
