import {
  GET_DASHBOARD_DATA,
  GET_CHART_ORDERS_DATA,
  GET_CHART_REVENUE_DATA,
} from '../types';
import { statisticalAPI } from '../../api';

export const getDashBoardData = () => async (dispatch) => {
  try {
    const res = await statisticalAPI.get_dashboard_data();
    console.log(res);
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res,
    });
  } catch (error) {}
};

export const getOrdersChartData = (year) => async (dispatch) => {
  try {
    const res = await statisticalAPI.get_orders_data(year);
    dispatch({
      type: GET_CHART_ORDERS_DATA,
      payload: res.data,
    });
  } catch (error) {}
};

export const getRevenuesChartData = (year) => async (dispatch) => {
  try {
    const res = await statisticalAPI.get_revenues_data(year);
    dispatch({
      type: GET_CHART_REVENUE_DATA,
      payload: res.data,
    });
  } catch (error) {}
};
