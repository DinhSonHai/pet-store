import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import cart from './cart';
import checkout from './checkout';
import types from './types';

export default combineReducers({
  products,
  auth,
  cart,
  checkout,
  types,
});
