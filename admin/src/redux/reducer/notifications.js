/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "../types";

const initialState = {
  notifications: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((item) => {
          let returnItem = item;
          if (item._id === payload) {
            returnItem = { ...item, isActive: true };
          } else if (item.isActive) {
            returnItem = { ...item, isActive: false };
          }
          return returnItem;
        }),
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item._id !== payload
        ),
      };
    default:
      return state;
  }
}
