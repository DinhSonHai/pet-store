import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
