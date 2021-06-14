import axios from 'axios';
import store from '../app/store';
import authAPI from './authAPI';
import billAPI from './billAPI';
import categoryAPI from './categoryAPI';
import orderAPI from './orderAPI';
import productAPI from './productAPI';
import receiptAPI from './receiptAPI';
import reviewAPI from './reviewAPI';
import statisticalAPI from './statisticalAPI';
import typeAPI from './typeAPI';
import blogAPI from './blogAPI';
import { LOGOUT } from '../redux/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);
export {
  authAPI,
  billAPI,
  categoryAPI,
  orderAPI,
  productAPI,
  receiptAPI,
  reviewAPI,
  statisticalAPI,
  typeAPI,
  blogAPI
};
export default api;
