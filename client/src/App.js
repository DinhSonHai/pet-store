import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './pages';
import { Layout } from 'antd';
import { Routes } from './routes';

import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </Layout>
    </Provider>
  );
}

export default App;
