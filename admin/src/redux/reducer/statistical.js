import {
  GET_ADMIN_STATISTICAL,
  GET_EMPLOYEE_STATISTICAL,
  GET_ADMIN_OVERALL_STATISTICAL,
  GET_CHART_DATA_STATISTICAL,
  STATISTICAL_ERROR
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  todayRevenues: null,
  todayBills: null,
  todaySales: null,
  newestOrders: null,
  newestReviews: null,
  newestComments: null,
  monthlyRevenues: null,
  annualRevenues: null,
  ordersDataChart: [],
  revenuesDataChart: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ADMIN_STATISTICAL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        todayRevenues: payload.todayRevenues,
        todayBills: payload.todayBills,
        todaySales: payload.todaySales,
        newestOrders: payload.newestOrders,
      };
    case GET_EMPLOYEE_STATISTICAL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        newestOrders: payload.newestOrders,
        newestReviews: payload.newestReviews,
        newestComments: payload.newestComments,
        todaySales: payload.todaySales
      };
    case GET_ADMIN_OVERALL_STATISTICAL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        todayRevenues: payload.todayRevenues,
        todayBills: payload.todayBills,
        todaySales: payload.todaySales,
        newestOrders: payload.newestOrders,
        newestReviews: payload.newestReviews,
        newestComments: payload.newestComments,
        monthlyRevenues: payload.monthlyRevenues,
        annualRevenues: payload.annualRevenues,
        ordersDataChart: payload.ordersDataChart,
        revenuesDataChart: payload.revenuesDataChart
      };
    case GET_CHART_DATA_STATISTICAL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ordersDataChart: payload.ordersDataChart,
        revenuesDataChart: payload.revenuesDataChart
      };
    case STATISTICAL_ERROR:
      return state;
    default:
      return state;
  }
}