import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const OrderRoute = ({
  component: Component,
  cart: { cartState, isHaveCart },
  checkout: { guestState, authState, isCheckedOut },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isHaveCart &&
        cartState.length > 0 &&
        isCheckedOut &&
        (guestState || authState) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/cart",
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
  checkout: state.checkout,
});
export default connect(mapStateToProps, {})(OrderRoute);
