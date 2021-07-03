/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_CONTACTS, UPDATE_CONTACT } from "../types";

const initialState = {
  contacts: [],
  total: 0,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CONTACTS:
      return {
        ...state,
        contacts: payload.data,
        total: payload.total,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((item) =>
          item._id === payload
            ? { ...item, status: true, confirmedAt: new Date() }
            : item
        ),
      };
    default:
      return state;
  }
}
