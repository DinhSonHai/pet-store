/* eslint-disable import/no-anonymous-default-export */
import { HIDE_NOTIFY_MESSAGES, GET_NOTIFY_MESSAGES } from '../types';

const initialState = {
  isShow: true,
  message: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HIDE_NOTIFY_MESSAGES:
      return {
        ...state,
        isShow: payload,
      };
    case GET_NOTIFY_MESSAGES:
      return {
        ...state,
        message: payload
      }
    default:
      return state;
  }
}
