import store from "./store";
import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "../redux/actions/auth";
import {
  LOGOUT,
  CLEAR_CHECKOUT_INFO,
  CART_LOADER,
  REMOVE_CART,
  AUTH_ERROR,
  GET_GUEST_INFO,
  GET_AUTH_INFO
} from "../redux/types";
const initApp = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  } else {
    store.dispatch({ type: AUTH_ERROR });
  }
  const cartState = JSON.parse(localStorage.getItem("cart"));
  if (cartState && cartState.length > 0) {
    store.dispatch({
      type: CART_LOADER,
      payload: { cartState, isHaveCart: true },
    });
    const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
    if (guestInfo) {
      store.dispatch({
        type: GET_GUEST_INFO,
        payload: guestInfo,
      });
    }
    const authInfo = JSON.parse(localStorage.getItem("authInfo"));
    if(authInfo){
      store.dispatch({
        type: GET_AUTH_INFO,
        payload: authInfo,
      });
    }
  }
  window.addEventListener("storage", () => {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: REMOVE_CART });
      store.dispatch({ type: CLEAR_CHECKOUT_INFO });
  });
};

export default initApp;
