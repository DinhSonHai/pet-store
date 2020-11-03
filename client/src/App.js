import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Layout } from 'antd';
import { Routes } from './components/routing/Routes';
function App() {
  return (
    <Layout>
      <Router>
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
