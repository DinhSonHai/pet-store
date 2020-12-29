/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute, AuthRoute, CheckoutRoute } from '../routes';
import {
  Pets,
  CartHome,
  PetDetails,
  Home,
  Signin,
  Signup,
  Activate,
  SignOut,
  Forgot,
  Reset,
  Profile,
  Checkout,
  Order,
  PetsType,
} from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/pets/types/:id' component={Pets} />
      <Route exact path='/pets/all_types/:id' component={PetsType} />
      <Route exact path='/cart' component={CartHome} />
      <Route exact path='/pet/:id' component={PetDetails} />
      <AuthRoute exact path='/signin' component={Signin} />
      <AuthRoute exact path='/signup' component={Signup} />
      <PrivateRoute exact path='/signout' component={SignOut} />
      <AuthRoute exact path='/auth/activate/:token' component={Activate} />
      <AuthRoute exact path='/forget' component={Forgot} />
      <AuthRoute exact path='/auth/resetpassword/:token' component={Reset} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <CheckoutRoute exact path='/checkout' component={Checkout} />
      <CheckoutRoute exact path='/order' component={Order} />
    </Switch>
  );
}
