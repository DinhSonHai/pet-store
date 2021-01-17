import api from '../../api';
import {
  GET_DASHBOARD_DATA,
  GET_CHART_ORDERS_DATA,
  GET_CHART_REVENUE_DATA,
} from '../types';

function getData(path) {
  return new Promise((resolve, reject) => {
    api
      .get(path)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (err) {
        reject(err.error);
      });
  });
}

export const getDashBoardData = () => async (dispatch) => {
  try {
    const res = await Promise.all([
      getData('/statistical/todayrevenues'),
      getData('/statistical/monthlyrevenues'),
      getData('/statistical/annualrevenues'),
      getData('/statistical/newestorders'),
      getData('/statistical/newestreviews'),
      getData('/statistical/newestcomments'),
      getData('/statistical/todaybills'),
      getData('/statistical/todaysales'),
    ]);
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res,
    });
  } catch (error) {}
};

export const getOrdersChartData = (year) => async (dispatch) => {
  try {
    const res = await api.get(`/statistical/ordersdatachart/${year}`);
    dispatch({
      type: GET_CHART_ORDERS_DATA,
      payload: res.data,
    });
  } catch (error) {}
};

export const getRevenuesChartData = (year) => async (dispatch) => {
  try {
    const res = await api.get(`/statistical/revenuesdatachart/${year}`);
    dispatch({
      type: GET_CHART_REVENUE_DATA,
      payload: res.data,
    });
  } catch (error) {}
};
