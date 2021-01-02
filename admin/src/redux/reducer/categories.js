/* eslint-disable import/no-anonymous-default-export */
import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
  RESTORE_CATEGORY,
  GET_ALL_CATEGORIES_REMOVED,
} from '../types';

const initialState = {
  categories: [],
  categories_removed: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_ALL_CATEGORIES_REMOVED:
      return {
        ...state,
        categories_removed: payload,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, { ...payload }],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat._id === payload._id ? { ...payload } : cat
        ),
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat._id !== payload),
      };
    case RESTORE_CATEGORY:
      return {
        ...state,
        categories_removed: state.categories_removed.filter(
          (cat) => cat._id !== payload
        ),
      };
    default:
      return state;
  }
}
