/* eslint-disable import/no-anonymous-default-export */
import {
    GET_ALL_BLOGS,
    GET_NEWEST_BLOGS,
    GET_BLOG_BY_ID,
  } from "../types";
  
  const initialState = {
    blogs: [],
    newestBlogs: [],
    total: 0,
    blog: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_BLOGS:
        return {
          ...state,
          blogs: payload.data,
          total: payload.total,
        };
      case GET_NEWEST_BLOGS:
        return {
          ...state,
          newestBlogs: payload,
        };
      case GET_BLOG_BY_ID:
        return {
          ...state,
          blog: payload,
        };
      default:
        return state;
    }
  }
  