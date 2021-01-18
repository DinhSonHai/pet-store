import api from '../../api';
import { GET_UNCONFIRMED_REVIEWS, UPDATE_UNCONFIRMED_REVIEWS } from '../types';
import { message } from 'antd';
export const getAllUncomfirmedReviews = () => async (dispatch) => {
  try {
    const res = await api.get('/reviews/admin/reviews');
    dispatch({
      type: GET_UNCONFIRMED_REVIEWS,
      payload: res.data,
    });
  } catch (err) {}
};

export const declineReview = (reviewId, productId) => async (dispatch) => {
  try {
    const res = await api.put(
      `/reviews/admin/${reviewId}/${productId}/decline`
    );
    dispatch({
      type: UPDATE_UNCONFIRMED_REVIEWS,
      payload: reviewId,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

export const approveReview = (reviewId, productId) => async (dispatch) => {
  try {
    const res = await api.put(
      `/reviews/admin/${reviewId}/${productId}/approve`
    );
    dispatch({
      type: UPDATE_UNCONFIRMED_REVIEWS,
      payload: reviewId,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

export const responseReview = (reviewId, productId, values) => async (
  dispatch
) => {
  try {
    const res = await api.put(
      `/reviews/${reviewId}/response/${productId}`,
      values
    );
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};
