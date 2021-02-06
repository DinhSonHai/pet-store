import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import { Navbar, Footer } from './pages';
import { Routes } from './routes';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './auth/setAuthToken';
import { loadUser } from './redux/actions/auth';
import {
  LOGOUT,
  CLEAR_CHECKOUT_INFO,
  CART_LOADER,
  REMOVE_CART,
} from './redux/types';
import { REACT_APP_FACEBOOK_CLIENT } from './config/login';
import api from './api';
function App() {
  useEffect(() => {
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
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div>
          <MessengerCustomerChat
            pageId='106278264756196'
            appId={REACT_APP_FACEBOOK_CLIENT}
          />
        </div>
        <BackTop />
        <Switch>
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}
export default App;
