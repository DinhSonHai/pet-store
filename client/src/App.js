import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Footer } from './pages';
import { Routes } from './routes';

import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './auth/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { LOGOUT, CLEAR_PROFILE, CART_LOADER, REMOVE_CART } from './redux/types';
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
        store.dispatch({ type: CLEAR_PROFILE });
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}
export default App;
