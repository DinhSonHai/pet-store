import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import { Navbar, Footer } from './pages';
import { Routes } from './routes';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Provider } from 'react-redux';
import store from './app/store';
import initApp from './app/init';
import { REACT_APP_FACEBOOK_CLIENT } from './config/login';
function App() {
  useEffect(() => {
    initApp();
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
