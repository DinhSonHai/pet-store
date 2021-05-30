import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "../components";

const OrderRoute = ({
  component: Component,
  cart: { cartState, isHaveCart },
  checkout: { guestState, authState, isCheckedOut },
  auth: { loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loader className="product-loader" />
        ) : isHaveCart &&
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
  auth: state.auth,
});
export default connect(mapStateToProps, {})(OrderRoute);
