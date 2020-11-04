import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Layout } from 'antd';
import { Routes } from './components/routing/Routes';

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
