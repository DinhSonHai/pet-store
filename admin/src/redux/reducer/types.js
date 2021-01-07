/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_TYPES,
  REMOVE_TYPE,
  RESTORE_TYPE,
  GET_ALL_TYPES_REMOVED,
} from '../types';

const initialState = {
  types: [],
  types_removed: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TYPES:
      return {
        ...state,
        types: payload,
      };
    case GET_ALL_TYPES_REMOVED:
      return {
        ...state,
        types_removed: payload,
      };
    case REMOVE_TYPE:
      return {
        ...state,
        types: state.types.filter((ty) => ty._id !== payload),
      };
    case RESTORE_TYPE:
      return {
        ...state,
        types_removed: state.types_removed.filter((ty) => ty._id !== payload),
      };
    default:
      return state;
  }
}
