import { reviewAPI } from '../../api';
import { notifySuccess, notifyErrors } from '../../utils/notify';

export const review = (data, id) => async (dispatch) => {
  try {
    const res = await reviewAPI.review(data, id);
    notifySuccess(res.data.message);
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};

export const getReviewByProductId = (id) => async (dispatch) => {
  try {
    const res = await reviewAPI.get_reviews(id);
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};
