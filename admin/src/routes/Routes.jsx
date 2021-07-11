/* eslint-disable import/no-anonymous-default-export */
import { Switch } from 'react-router-dom';
import { PrivateRoute, AuthRoute } from '../routes';
import { Home, Signin, Signout, Invoice, Forgot, Reset } from '../pages';

export default function () {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Home} />
      <AuthRoute exact path='/signin' component={Signin} />
      <AuthRoute exact path='/forgot' component={Forgot} />
      <AuthRoute
        exact
        path='/auth/resetpassword/:token'
        component={Reset}
      />
      <PrivateRoute exact path='/signout' component={Signout} />
      <PrivateRoute exact path='/invoice/:page/:id' component={Invoice} />
    </Switch>
  );
}
