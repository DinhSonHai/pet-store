import { GET_ALL_CONTACTS, UPDATE_CONTACT } from "../types";
import { notifyActions } from "../../utils/notify";
import { contactAPI } from "../../api";

// get all contacts
export const getAllContacts = () => async (dispatch) => {
  try {
    const res = await contactAPI.get_all();
    dispatch({
      type: GET_ALL_CONTACTS,
      payload: res.data,
    });
  } catch (err) {}
};

export const updateContact = (id) => async (dispatch) => {
  try {
    const res = await contactAPI.update(id);
    dispatch({
      type: UPDATE_CONTACT,
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
