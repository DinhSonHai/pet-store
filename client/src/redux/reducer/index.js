import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import cart from './cart';

export default combineReducers({
  products,
  auth,
  cart,
});
