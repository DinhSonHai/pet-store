import api from '../../api';
import {   GET_ADMIN_STATISTICAL, GET_EMPLOYEE_STATISTICAL, STATISTICAL_ERROR } from '../types';
import { notification } from 'antd';

//Lấy dữ liệu thống kê admin có thể xem
export const loadAdminStatisticalData = () => async (dispatch) => {
  try {
    const resTodayRevenues = await api.get('/statistical/todayrevenues');
    const resTodayBills = await api.get('/statistical/todaybills');
    const resTodaySales = await api.get('/statistical/todaysales');
    const resNewestOrders = await api.get('/statistical/newestorders');

    dispatch({
      type: GET_ADMIN_STATISTICAL,
      payload: {
        todayRevenues: resTodayRevenues.data,
        todayBills: resTodayBills.data,
        todaySales: resTodaySales.data,
        newestOrders: resNewestOrders.data,
      },
    });
  } catch (err) {
    dispatch({
      type: STATISTICAL_ERROR,
    });
  }
};

//Lấy dữ liệu thống kê nhân viên có thể xem
export const loadEmployeeStatisticalData = () => async (dispatch) => {
  try {
    const resNewestOrders = await api.get('/statistical/newestorders');
    const resNewestReviews = await api.get('/statistical/newestreviews');
    const resNewestComments = await api.get('/statistical/newestcomments');
    const resTodaySales = await api.get('/statistical/todaysales');

    dispatch({
      type: GET_EMPLOYEE_STATISTICAL,
      payload: {
        newestOrders: resNewestOrders.data,
        newestReviews: resNewestReviews.data,
        newestComments: resNewestComments.data,
        todaySales: resTodaySales.data,
      },
    });
  } catch (err) {
    dispatch({
      type: STATISTICAL_ERROR,
    });
  }
};