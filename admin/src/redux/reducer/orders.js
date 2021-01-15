/* eslint-disable import/no-anonymous-default-export */
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

const initialState = {
  comfirmOrders: [],
  pickUpOrders: [],
  packingOrders: [],
  packedOrders: [],
  transportingOrders: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CONFIRM_ORDERS:
      return {
        ...state,
        comfirmOrders: payload,
      };
    case UPDATE_CONFIRM_ORDERS:
      return {
        ...state,
        comfirmOrders: state.comfirmOrders.filter(
          (order) => order._id !== payload
        ),
      };
    case GET_PICKUP_ORDERS:
      return {
        ...state,
        pickUpOrders: payload,
      };
    case UPDATE_PICKUP_ORDERS:
      return {
        ...state,
        pickUpOrders: state.pickUpOrders.filter(
          (order) => order._id !== payload
        ),
      };
    case GET_PACKING_ORDERS:
      return {
        ...state,
        packingOrders: payload,
      };
    case UPDATE_PACKING_ORDERS:
      return {
        ...state,
        packingOrders: state.packingOrders.filter(
          (order) => order._id !== payload
        ),
      };
    case GET_PACKED_ORDERS:
      return {
        ...state,
        packedOrders: payload,
      };
    case UPDATE_PACKED_ORDERS:
      return {
        ...state,
        packedOrders: state.packedOrders.filter(
          (order) => order._id !== payload
        ),
      };
    case GET_TRANSPORTING_ORDERS:
      return {
        ...state,
        transportingOrders: payload,
      };
    case UPDATE_TRANSPORTING_ORDERS:
      return {
        ...state,
        transportingOrders: state.transportingOrders.filter(
          (order) => order._id !== payload
        ),
      };
    default:
      return state;
  }
}
