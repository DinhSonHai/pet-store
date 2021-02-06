import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import { Routes } from './routes';
import setAuthToken from './auth/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import api from './api';
import { LOGOUT } from './redux/types';

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
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <BackTop />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
