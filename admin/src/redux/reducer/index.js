import { combineReducers } from 'redux';
import products from './products';
import auth from './auth';
import categories from './categories';
import types from './types';
import receipts from './receipts';
import orders from './orders';
import bills from './bills';
import reviews from './reviews';
import statistical from './statistical';

export default combineReducers({
  products,
  auth,
  categories,
  types,
  receipts,
  orders,
  bills,
  reviews,
  statistical,
});
