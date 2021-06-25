import {
    GET_ALL_BLOGS,
    REMOVE_BLOG,
  } from '../types';
  import { blogAPI } from '../../api';
  import { notifyActions } from '../../utils/notify';
  
  // get all blogs
  export const getAllBlogs = (page) => async (dispatch) => {
    try {
      const res = await blogAPI.get_all(page);
      dispatch({
        type: GET_ALL_BLOGS,
        payload: res.data,
      });
    } catch (err) {}
  };
  
  // create blog
  export const createBlog = (data) => async (dispatch) => {
    try {
      const res = await blogAPI.create(data);
      notifyActions('success', res.data.message);
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => notifyActions('error', error.msg));
      }
    }
  };
  
  // edit blog
  export const editBlog = (id, data) => async (dispatch) => {
    try {
      const res = await blogAPI.update(id, data);
      notifyActions('success', res.data.message);
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => notifyActions('error', error.msg));
      }
    }
  };
  
  // remove blog
  export const removeBlog = (id) => async (dispatch) => {
    try {
      const res = await blogAPI.remove(id);
      dispatch({
        type: REMOVE_BLOG,
        payload: id,
      });
      notifyActions('success', res.data.message);
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => notifyActions('error', error.msg));
      }
    }
  };
  
  