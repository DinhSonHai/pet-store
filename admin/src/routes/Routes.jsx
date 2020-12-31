/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../routes';
import { Home } from '../pages';

export default function () {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={Home} />
    </Switch>
  );
}
