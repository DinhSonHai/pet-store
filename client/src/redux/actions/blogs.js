import {
  GET_ALL_BLOGS,
  GET_BLOG_BY_ID,
  GET_NEWEST_BLOGS
} from "../types";
import { blogAPI } from "../../api";
import { notifyErrors } from "../../utils/notify";

// Lấy ta ca blogs
export const getAllBlogs =
  (page) => async (dispatch) => {
    try {
      const res = await blogAPI.get_all(page);
      dispatch({
        type: GET_ALL_BLOGS,
        payload: res.data,
      });
    } catch (err) {}
  };

// Lấy ta ca blogs
export const getBlogsByTags =
  (tags, page) => async (dispatch) => {
    try {
      const res = await blogAPI.get_by_tags(tags, page);
      dispatch({
        type: GET_ALL_BLOGS,
        payload: res.data,
      });
    } catch (err) {}
  };

// Lay blog moi nhat
export const getNewestBlogs =
  () => async (dispatch) => {
    try {
      const res = await blogAPI.get_newest();
      dispatch({
        type: GET_NEWEST_BLOGS,
        payload: res.data,
      });
    } catch (err) {}
  };

// Lấy blog theo id
export const getBlogById = (id) => async (dispatch) => {
  try {
    const res = await blogAPI.get_by_id(id);
    dispatch({
      type: GET_BLOG_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    notifyErrors(err);
  }
};

//Lấy blogs theo từ khóa
export const getSearchBlogsList =
  (q, page) => async (dispatch) => {
    try {
      const res = await blogAPI.get_by_searching(q, page);
      dispatch({
        type: GET_ALL_BLOGS,
        payload: res.data,
      });
    } catch (err) {}
  };
