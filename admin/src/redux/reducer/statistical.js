/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DASHBOARD_DATA,
  GET_CHART_ORDERS_DATA,
  GET_CHART_REVENUE_DATA,
} from '../types';

const initialState = {
  dashboardData: {
    todayRevenues: null,
    todayBills: null,
    todaySales: null,
    newestOrders: null,
    newestReviews: null,
    newestComments: null,
    monthlyRevenues: null,
    annualRevenues: null,
  },
  revenuesDataChart: [],
  ordersDataChart: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          todayRevenues: payload[0].todayRevenues,
          monthlyRevenues: payload[1].monthlyRevenues,
          annualRevenues: payload[2].annualRevenues,
          newestOrders: payload[3].orderCount,
          newestReviews: payload[4].reviewCount,
          newestComments: payload[5].commentCount,
          todayBills: payload[6].billCount,
          todaySales: payload[7].productCount,
        },
      };
    case GET_CHART_ORDERS_DATA:
      return {
        ...state,
        ordersDataChart: payload,
      };
    case GET_CHART_REVENUE_DATA:
      return {
        ...state,
        revenuesDataChart: payload,
      };
    default:
      return state;
  }
}
