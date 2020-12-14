import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const CheckoutRoute = ({
  component: Component,
  cart: { cartState, isHaveCart },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isHaveCart && cartState.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/cart',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps, {})(CheckoutRoute);
