import { GET_NOTIFY_MESSAGES } from "../types";
import { notificationAPI } from "../../api";

// get all notifications
export const getAllNotifications = () => async (dispatch) => {
  try {
    const res = await notificationAPI.get_all();
    dispatch({
      type: GET_NOTIFY_MESSAGES,
      payload: res.data,
    });
  } catch (err) {}
};
