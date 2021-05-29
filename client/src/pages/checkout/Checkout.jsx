/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect } from "react";
import { Col, Row } from "antd";
import CheckoutFormGuest from "./form_guest";
import CheckoutOrder from "./order";
import CheckoutAddress from "./address";
import CheckoutFormAuth from "./form_auth";
import equal from "fast-deep-equal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../app/store";
import { REMOVE_CART } from "../../redux/types";
import "./styles.scss";
const Checkout = ({
  cartState,
  history,
  auth: { isAuthenticated, user },
  checkout: { guestState },
}) => {
  const [totalCart, setTotalCart] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("storage", () => {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart && cartState) {
        if (!equal(cart, cartState)) {
          return store.dispatch({ type: REMOVE_CART });
        }
      }
      const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
      if (guestInfo && guestState) {
        if (!equal(guestInfo, guestState)) {
          return store.dispatch({ type: REMOVE_CART });
        }
      }
    });
    if (cartState && cartState.length > 0) {
      let total_value = cartState.reduce((a, b) => a + b.price * b.amount, 0);
      setTotalCart(total_value);
    }
  }, []);

  return (
    <section className="checkout">
      <div className="checkout__wrap container">
        {!isAuthenticated && (
          <div className="checkout__title">
            <div>
              <span>Địa chỉ của bạn hoặc </span>
              <Link to="/signin">Đăng nhập</Link>
            </div>
          </div>
        )}
        <Row gutter={[16, 16]}>
          <Col className="checkout__form" xs={24} sm={24} md={24} lg={15}>
            {isAuthenticated ? (
              <Fragment>
                <CheckoutAddress visible={visible} setVisible={setVisible} />
                <CheckoutFormAuth
                  user={user}
                  history={history}
                  cartState={cartState}
                />
              </Fragment>
            ) : (
              <CheckoutFormGuest history={history} guestData={guestState} cartState={cartState} />
            )}
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} className="checkout__order">
            <CheckoutOrder totalCart={totalCart} cartState={cartState} />
          </Col>
        </Row>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  cartState: state.cart.cartState,
  checkout: state.checkout,
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Checkout);
