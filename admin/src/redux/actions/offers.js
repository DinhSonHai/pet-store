import {
  GET_ALL_OFFERS, GET_OFFER_BY_ID,
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

// get offer by id
export const getOfferById = (id) => async (dispatch) => {
  try {
    const res = await offerAPI.get_by_id(id);
    dispatch({
      type: GET_OFFER_BY_ID,
      payload: res.data,
    });
  } catch (err) {}
};
