import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "../components";

const CheckoutRoute = ({
  component: Component,
  cart: { cartState, isHaveCart },
  auth: { loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loader className="product-loader" />
        ) : isHaveCart && cartState.length > 0 ? (
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
  auth: state.auth,
});
export default connect(mapStateToProps, {})(CheckoutRoute);
