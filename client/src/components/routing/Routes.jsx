import { Route, Switch } from 'react-router-dom';
import Pets from '../pets/Pets';
import { CartHome } from '../cart/CartHome';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path='/pets' component={Pets} />
      <Route exact path='/cart' component={CartHome} />
    </Switch>
  );
};
