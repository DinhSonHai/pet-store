import { GET_UNCONFIRMED_REVIEWS, UPDATE_UNCONFIRMED_REVIEWS } from '../types';
import { reviewAPI } from '../../api';
import { notifyActions } from '../../utils/notify';
export const getAllUncomfirmedReviews = () => async (dispatch) => {
  try {
    const res = await reviewAPI.get_unconfirmed();
    dispatch({
      type: GET_UNCONFIRMED_REVIEWS,
      payload: res.data,
    });
  } catch (err) {}
};

export const declineReview = (reviewId, productId) => async (dispatch) => {
  try {
    const res = await reviewAPI.decline(reviewId, productId);
    dispatch({
      type: UPDATE_UNCONFIRMED_REVIEWS,
      payload: reviewId,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

export const approveReview = (reviewId, productId, data = {}) => async (dispatch) => {
  try {
    const res = await reviewAPI.approve(reviewId, productId, data);
    dispatch({
      type: UPDATE_UNCONFIRMED_REVIEWS,
      payload: reviewId,
    });
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};

export const responseReview = (reviewId, productId, values) => async (
  dispatch
) => {
  try {
    const res = await reviewAPI.response(reviewId, productId, values);
    notifyActions('success', res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions('error', error.msg));
    }
  }
};
