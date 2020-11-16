/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { Pets, CartHome, PetDetails } from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/pets/types/:id' component={Pets} />
      <Route exact path='/cart' component={CartHome} />
      <Route exact path='/pet/:id' component={PetDetails} />
    </Switch>
  );
}
