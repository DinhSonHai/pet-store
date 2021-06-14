/* eslint-disable import/no-anonymous-default-export */
import {
    GET_ALL_BLOGS,
    REMOVE_BLOG,
  } from '../types';
  
  const initialState = {
    blogs: [],
    total: 0,
  };
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_BLOGS:
        return {
          ...state,
          blogs: payload.data,
          total: payload.total
        };
      case REMOVE_BLOG:
        return {
          ...state,
          blogs: state.blogs.filter((blog) => blog._id !== payload),
        };
      default:
        return state;
    }
  }
  