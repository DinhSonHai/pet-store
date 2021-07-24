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
import blogs from './blogs';
import offers from './offers';
import contacts from './contacts';
import promos from './promos';
import notifications from './notifications';
import customers from './customers';

export default combineReducers({
  auth,
  blogs,
  bills,
  categories,
  contacts,
  customers,
  notifications,
  orders,
  products,
  receipts,
  reviews,
  statistical,
  types,
  offers,
  promos
});
