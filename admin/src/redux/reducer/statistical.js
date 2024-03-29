/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DASHBOARD_DATA,
  GET_STATISTICAL_DATA,
  GET_CHART_ORDERS_DATA,
  GET_CHART_REVENUE_DATA,
} from "../types";

const initialState = {
  dashboardData: {
    todayRevenues: null,
    todayBills: null,
    todaySales: null,
    newestOrders: null,
    newestReviews: null,
    userCount: null,
    monthlyRevenues: null,
    annualRevenues: null,
  },
  statisticalData: {
    totalRevenues: null,
    totalBills: null,
    totalSold: null,
    bestsellers: [],
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
          todayRevenues: payload[0].totalRevenues,
          monthlyRevenues: payload[1].totalRevenues,
          annualRevenues: payload[2].totalRevenues,
          newestOrders: payload[3].orderCount,
          newestReviews: payload[4].reviewCount,
          userCount: payload[5].userCount,
          todayBills: payload[6].billCount,
          todaySales: payload[7].productCount,
        },
      };
    case GET_STATISTICAL_DATA:
      return {
        ...state,
        statisticalData: {
          ...state.statisticalData,
          totalRevenues: payload[0].totalRevenues,
          totalBills: payload[1].billCount,
          totalSold: payload[2].productCount,
          bestsellers: payload[3].products,
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
