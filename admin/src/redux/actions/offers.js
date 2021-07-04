import {
  GET_ALL_OFFERS, GET_OFFER_BY_ID,
} from '../types';
import { offerAPI } from '../../api';
import { notifyActions } from '../../utils/notify';

// get all offers
export const getAllOffers = (page) => async (dispatch) => {
  try {
    const res = await offerAPI.get_all(page);
    console.log(res.data);
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
    return true;
  } catch (err) {
    notifyActions('error', err.response.data?.errors[0].msg);
    return false;
  }
};

// deactivate offers
export const deactivateOffer = (id) => async (dispatch) => {
  try {
    const res = await offerAPI.deactivate_offer(id);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    notifyActions('error', err.response.data?.errors[0].msg);
    return false;
  }
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

// create offer
export const createOffer = (data) => async (dispatch) => {
  try {
    const res = await offerAPI.create_offer(data);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    notifyActions('error', err.response.data?.errors[0].msg);
    return false;
  }
}

// edit offer
export const editOffer = (id, data) => async (dispatch) => {
  try {
    const res = await offerAPI.edit_offer(id, data);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    notifyActions('error', err.response.data?.errors[0].msg);
    return false;
  }
}

// delete offer
export const deleteOffer = (id) => async (dispatch) => {
  try {
    const res = await offerAPI.delete_offer(id);
    console.log(res.data.message)
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    notifyActions('error', err.response.data?.errors[0].msg);
    return false;
  }
}
