import { Route, Switch } from 'react-router-dom';
import { Pets } from '../pets/Pets';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Pets} />
    </Switch>
  );
};
