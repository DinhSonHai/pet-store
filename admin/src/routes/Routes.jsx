/* eslint-disable import/no-anonymous-default-export */
import { Route, Switch } from 'react-router-dom';
import { Home } from '../pages';

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  );
}
