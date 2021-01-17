/* eslint-disable import/no-anonymous-default-export */
import { GET_UNCONFIRMED_REVIEWS, UPDATE_UNCONFIRMED_REVIEWS } from '../types';

const initialState = {
  reviewsOnProducts: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_UNCONFIRMED_REVIEWS:
      return {
        ...state,
        reviewsOnProducts: payload,
      };
    case UPDATE_UNCONFIRMED_REVIEWS:
      return {
        ...state,
        reviewsOnProducts: state.reviewsOnProducts.filter(
          (rv) => rv._id !== payload
        ),
      };
    default:
      return state;
  }
}
