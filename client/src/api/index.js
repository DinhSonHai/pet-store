import axios from 'axios';
import store from '../app/store';
import addressAPI from './addressAPI';
import authAPI from './authAPI';
import orderAPI from './orderAPI';
import productAPI from './productAPI';
import reviewAPI from './reviewAPI';
import typeAPI from './typeAPI';
import blogAPI from './blogAPI'
import saleAPI from './saleAPI';
import contactAPI from './contactAPI';
import { LOGOUT, CLEAR_PROFILE } from '../redux/types';

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
      store.dispatch({ type: CLEAR_PROFILE });
    }
    return Promise.reject(err);
  }
);
export { addressAPI, authAPI, orderAPI, productAPI, reviewAPI, typeAPI, blogAPI, saleAPI, contactAPI };
export default api;
