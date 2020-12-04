import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Footer } from './pages';
import { Routes } from './routes';

import { Layout } from 'antd';

import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './auth/setAuthToken';
function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
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
