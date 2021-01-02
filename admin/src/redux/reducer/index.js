import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import categories from './categories';

export default combineReducers({
  products,
  auth,
  categories,
});
