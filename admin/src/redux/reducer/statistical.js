import {
  GET_ADMIN_STATISTICAL,
  GET_EMPLOYEE_STATISTICAL,
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
  newestComments: null
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
    case STATISTICAL_ERROR:
      return state;
    default:
      return state;
  }
}