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

// activate offers
export const activateOffer = (id) => async (dispatch) => {
  try {
    const res = await offerAPI.activate_offer(id);
    notifyActions('success', res.data.message);
  } catch (err) {}
};

// deactivate offers
export const deactivateOffer = (id) => async (dispatch) => {
  try {
    const res = await offerAPI.deactivate_offer(id);
    notifyActions('success', res.data.message);
  } catch (err) {}
};
