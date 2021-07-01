import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import cart from './cart';
import checkout from './checkout';
import types from './types';
import blogs from './blogs';
import sales from './sales';

export default combineReducers({
  auth,
  blogs,
  cart,
  checkout,
  products,
  sales,
  types,
});
