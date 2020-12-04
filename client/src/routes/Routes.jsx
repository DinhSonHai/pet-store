/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import {
  Pets,
  CartHome,
  PetDetails,
  Home,
  Signin,
  Signup,
  Activate,
} from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/pets/types/:id' component={Pets} />
      <Route exact path='/cart' component={CartHome} />
      <Route exact path='/pet/:id' component={PetDetails} />
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/auth/activate/:token' component={Activate} />
    </Switch>
  );
}
