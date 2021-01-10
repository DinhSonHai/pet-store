import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import categories from './categories';
import types from './types';
import receipts from './receipts';

export default combineReducers({
  products,
  auth,
  categories,
  types,
  receipts,
});
