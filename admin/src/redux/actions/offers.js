import {
  GET_ALL_OFFERS,
} from '../types';
import { offerAPI } from '../../api';
import { notifyActions } from '../../utils/notify';

// get all offers
export const getAllOffers = (page) => async (dispatch) => {
  try {
    const res = await offerAPI.get_all(page);
    dispatch({
      type: GET_ALL_OFFERS,
      payload: res.data,
    });
  } catch (err) {}
};
