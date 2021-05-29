/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute, AuthRoute, CheckoutRoute, OrderRoute } from '../routes';
import * as pages from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={pages.Home} />
      <Route exact path='/products/search' component={pages.SearchList} />
      <Route
        exact
        path='/products/:type/list/:id'
        component={pages.ProductList}
      />
      <Route
        exact
        path='/products/:type/post/:id'
        component={pages.ProductPost}
      />
      <Route exact path='/products/:type/:id' component={pages.ProductType} />
      <Route exact path='/cart' component={pages.CartHome} />
      <Route
        exact
        path='/product/:productName/:id'
        component={pages.ProductDetails}
      />
      <Route exact path="/about" component={pages.About}/>
      <Route exact path="/services" component={pages.Service}/>
      <AuthRoute exact path='/signin' component={pages.Signin} />
      <AuthRoute exact path='/signup' component={pages.Signup} />
      <PrivateRoute exact path='/signout' component={pages.SignOut} />
      <AuthRoute
        exact
        path='/auth/activate/:token'
        component={pages.Activate}
      />
      <AuthRoute exact path='/forget' component={pages.Forgot} />
      <AuthRoute
        exact
        path='/auth/resetpassword/:token'
        component={pages.Reset}
      />
      <PrivateRoute exact path='/profile' component={pages.Profile} />
      <CheckoutRoute exact path='/checkout' component={pages.Checkout} />
      <OrderRoute exact path='/order' component={pages.Order} />
      <Route component={pages.NotFound} />
    </Switch>
  );
}
