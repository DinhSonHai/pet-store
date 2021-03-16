import { orderAPI } from '../../api';
import { notifyActions, notifyErrors, notifySuccess } from '../../utils/notify';

// Đặt hàng vai trò khách
export const orderProducts = (data) => async (dispatch) => {
  try {
    const res = await orderAPI.order_guest(data);
    notifySuccess(res.data.message);
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};

// Đặt hàng vai trò người dùng
export const orderProductsAuth = (data) => async (dispatch) => {
  try {
    const res = await orderAPI.order_auth(data);
    notifySuccess(res.data.message);
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};

// Lấy đơn hàng bị hủy
export const getCaneledOrders = () => async (dispatch) => {
  try {
    const res = await orderAPI.get_canceled_order();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

//Lấy đơn hàng hoàn tất
export const getCompletedOrders = () => async (dispatch) => {
  try {
    const res = await orderAPI.get_completed_order();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Lấy đơn hàng đang xử lí
export const getProcessingOrders = () => async (dispatch) => {
  try {
    const res = await orderAPI.get_processing_order();
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Lấy đơn hàng theo orderId phía người dùng
export const getOrderById = (id) => async (dispatch) => {
  try {
    const res = await orderAPI.get_by_id(id);
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};

// Lấy chi tiết đơn hàng theo orderId phía người dùng
export const getOrderDetailById = (id) => async (dispatch) => {
  try {
    const res = await orderAPI.get_details(id);
    return res.data;
  } catch (err) {
    notifyErrors(err);
  }
};
// Hủy đơn hàng phía người dùng
export const cancelOrderById = (id) => async (dispatch) => {
  try {
    const res = await orderAPI.cancel_order(id);
    notifyActions('success', res.data.message);
    return true;
  } catch (err) {
    notifyErrors(err);
  }
};
