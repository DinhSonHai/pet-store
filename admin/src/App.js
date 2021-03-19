import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import { Routes } from './routes';
import { Provider } from 'react-redux';
import store from './app/store';
import initApp from './app/init';

function App() {
  useEffect(() => {
    initApp();
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
