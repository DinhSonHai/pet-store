/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { Pets, CartHome } from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/pets' component={Pets} />
      <Route exact path='/cart' component={CartHome} />
    </Switch>
  );
}
