import { GET_ALL_PROMOS, REMOVE_PROMO } from "../types";
import { promoAPI } from "../../api";
import { notifyActions } from "../../utils/notify";

// get all promos
export const getAllPromos = () => async (dispatch) => {
  try {
    const res = await promoAPI.get_all();
    dispatch({
      type: GET_ALL_PROMOS,
      payload: res.data,
    });
  } catch (err) {}
};

// create promo
export const createPromo = (data) => async (dispatch) => {
  try {
    const res = await promoAPI.create(data);
    notifyActions("success", res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions("error", error.msg));
    }
  }
};

// edit promo
export const editPromo = (id, data) => async (dispatch) => {
  try {
    const res = await promoAPI.update(id, data);
    notifyActions("success", res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions("error", error.msg));
    }
  }
};

// remove promo
export const removePromo = (id) => async (dispatch) => {
  try {
    const res = await promoAPI.remove(id);
    dispatch({
      type: REMOVE_PROMO,
      payload: id,
    });
    notifyActions("success", res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions("error", error.msg));
    }
  }
};
