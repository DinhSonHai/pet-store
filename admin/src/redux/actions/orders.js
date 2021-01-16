import api from '../../api';
import {
  GET_CONFIRM_ORDERS,
  GET_PICKUP_ORDERS,
  GET_PACKING_ORDERS,
  GET_PACKED_ORDERS,
  GET_TRANSPORTING_ORDERS,
  UPDATE_CONFIRM_ORDERS,
  UPDATE_PICKUP_ORDERS,
  UPDATE_PACKING_ORDERS,
  UPDATE_PACKED_ORDERS,
  UPDATE_TRANSPORTING_ORDERS,
} from '../types';
import { message } from 'antd';

// Lấy các đơn hàng theo trạng thái phía admin
export const getOrdersByStatus = (status) => async (dispatch) => {
  let st = parseInt(status);
  try {
    const res = await api.get(`orders/${st}/admin`);
    dispatch({
      type:
        st === 0
          ? GET_CONFIRM_ORDERS
          : st === 1
          ? GET_PICKUP_ORDERS
          : st === 2
          ? GET_PACKING_ORDERS
          : st === 3
          ? GET_PACKED_ORDERS
          : st === 4 && GET_TRANSPORTING_ORDERS,
      payload: res.data,
    });
  } catch (err) {}
};

// Lấy chi tiết đơn hàng theo orderId phía admin
export const getOrdersDetail = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/orders/detail/admin/${id}`);
    return res.data;
  } catch (err) {}
};

// Hủy đơn hàng
export const cancelOrder = (id, status) => async (dispatch) => {
  let st = parseInt(status);
  try {
    const res = await api.put(`/orders/admin/${id}`);
    dispatch({
      type: st === 0 ? UPDATE_CONFIRM_ORDERS : st === 1 && UPDATE_PICKUP_ORDERS,
      payload: id,
    });
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// Lấy đơn hàng theo orderId phía admin
export const getOrder = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/orders/admin/${id}`);
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// Cập nhật trạng thái đơn hàng phía admin
export const updateOrderStatus = (id, status) => async (dispatch) => {
  let st = parseInt(status);
  try {
    const res = await api.put(`/orders/${id}`);
    dispatch({
      type:
        st === 0
          ? UPDATE_CONFIRM_ORDERS
          : st === 1
          ? UPDATE_PICKUP_ORDERS
          : st === 2
          ? UPDATE_PACKING_ORDERS
          : st === 3
          ? UPDATE_PACKED_ORDERS
          : st === 4 && UPDATE_TRANSPORTING_ORDERS,
      payload: id,
    });
    message.success(res.data.message);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};

// Đặt hàng
export const adminOrder = (data) => async (dispatch) => {
  try {
    const res = await api.post('/orders/admin', data);
    message.success(res.data.message);
    return true;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => message.error(error.msg));
    }
  }
};
