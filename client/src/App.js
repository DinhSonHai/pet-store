import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Footer } from './pages';
import { Routes } from './routes';

import { Layout } from 'antd';

import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './auth/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { LOGOUT, CLEAR_PROFILE } from './redux/types';
import api from './api';
function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    window.addEventListener('storage', () => {
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
        <Layout>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
