import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import cart from './cart';
import checkout from './checkout';

export default combineReducers({
  products,
  auth,
  cart,
  checkout,
});
