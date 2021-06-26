import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Provider } from 'react-redux';

import { Navbar, Footer } from './pages';
import { Routes } from './routes';
import store from './app/store';
import initApp from './app/init';
import { REACT_APP_FACEBOOK_CLIENT } from './config/login';

const PUBLIC_KEY = "pk_test_51IvmIRJiEjfuJbiQgaBBynYph42Zp0k82dOg0dybG8l5V9RBlmVIEusGFkxGzERQYnhVuD8j7blRirxdtvSjkjRZ00FWXIqwOZ";
const stripePromise = loadStripe(PUBLIC_KEY);

initApp();

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div>
            <MessengerCustomerChat
              pageId='113027407691307'
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
    </Elements>
  );
}
export default App;
