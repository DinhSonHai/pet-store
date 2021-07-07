import { GET_ALL_NOTIFICATIONS, REMOVE_NOTIFICATION } from "../types";
import { notificationAPI } from "../../api";
import { notifyActions } from "../../utils/notify";

// get all notifications
export const getAllNotifications = () => async (dispatch) => {
  try {
    const res = await notificationAPI.get_all();
    dispatch({
      type: GET_ALL_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {}
};

// create notify
export const createNotification = (data) => async (dispatch) => {
  try {
    const res = await notificationAPI.create(data);
    notifyActions("success", res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions("error", error.msg));
    }
  }
};

// edit notification
export const editNotification = (id, data) => async (dispatch) => {
  try {
    const res = await notificationAPI.update(id, data);
    notifyActions("success", res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => notifyActions("error", error.msg));
    }
  }
};

// remove notification
export const removeNotification = (id) => async (dispatch) => {
  try {
    const res = await notificationAPI.remove(id);
    dispatch({
      type: REMOVE_NOTIFICATION,
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
