import store from './store';
import api from '../api';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../redux/actions/auth';
import {
  LOGOUT,
  CLEAR_CHECKOUT_INFO,
  CART_LOADER,
  REMOVE_CART,
} from '../redux/types';
const initApp = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  let cartState = JSON.parse(localStorage.getItem('cart'));
  if (cartState && cartState.length > 0) {
    store.dispatch({
      type: CART_LOADER,
      payload: { cartState, isHaveCart: true },
    });
  }
  store.dispatch(loadUser());
  window.addEventListener('storage', () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length <= 0) {
      store.dispatch({ type: REMOVE_CART });
    }
    if (
      !localStorage.token ||
      api.defaults.headers.common['x-auth-token'] !== localStorage.token
    ) {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: REMOVE_CART });
      store.dispatch({ type: CLEAR_CHECKOUT_INFO });
      localStorage.removeItem('cart');
    }
  });
};

export default initApp;
