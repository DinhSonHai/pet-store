/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Col, Row } from "antd";
import equal from "fast-deep-equal";
import { connect } from "react-redux";
import { orderProducts, orderProductsAuth } from "../../redux/actions/order";
import Payment from "./payment";
import Shipment from "./shipment";
import CartInfo from "./cart";
import Information from "./infomation";
import PropTypes from "prop-types";
import store from "../../app/store";
import {
  REMOVE_CART,
  UPDATE_GUEST_INFO,
  UPDATE_AUTH_INFO,
  CLEAR_CHECKOUT_INFO,
} from "../../redux/types";
import { BuyStep } from "../../components";
import "./styles.scss";

const style = {
  display: "block",
  lineHeight: "30px",
};
const Order = ({
  cartState,
  history,
  auth: { isAuthenticated },
  checkout: { guestState, authState },
  orderProducts,
  orderProductsAuth,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [deliveryState, SetDeliveryState] = useState({
    value: 0,
    price: 35000,
  });
  const [paymentState, SetPaymentState] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const guestInfo = JSON.parse(localStorage.getItem("guestInfo"));
    window.addEventListener("storage", () => {
      if (cart && cartState) {
        if (!equal(cart, cartState)) {
          return store.dispatch({ type: CLEAR_CHECKOUT_INFO });
        }
      }
      if (guestInfo && guestState) {
        if (!equal(guestInfo, guestState)) {
          return store.dispatch({ type: CLEAR_CHECKOUT_INFO });
        }
      }
    });
    if (cartState && cartState.length > 0) {
      let total_value = cartState.reduce((a, b) => a + b.price * b.amount, 0);
      setTotalMoney(total_value + deliveryState.price);
      if (isAuthenticated) {
        store.dispatch({
          type: UPDATE_AUTH_INFO,
          payload: {
            deliveryState: deliveryState.value,
            paymentState,
            totalMoney: total_value + deliveryState.price,
          },
        });
        return;
      }
      store.dispatch({
        type: UPDATE_GUEST_INFO,
        payload: {
          deliveryState: deliveryState.value,
          paymentState,
          totalMoney: total_value + deliveryState.price,
        },
      });
    }
  }, [cartState, deliveryState]);
  const onChangeDelivery = (e) => {
    SetDeliveryState({
      ...deliveryState,
      value: e.target.value,
      price: e.target.value === 0 ? 35000 : 55000,
    });
  };
  const onChangePayment = (e) => {
    SetPaymentState(e.target.value);
  };
  const onFinish = async () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!equal(cart, cartState)) {
      return history.push("/cart");
    }
    setIsProcessing(true);
    let res;
    if (isAuthenticated) {
      res = await orderProductsAuth(authState);
    } else {
      res = await orderProducts(guestState);
    }
    setIsProcessing(false);
    if (res) {
      store.dispatch({
        type: REMOVE_CART,
      });
      store.dispatch({
        type: CLEAR_CHECKOUT_INFO,
      });
    }
  };

  return (
    <section className="order">
      <div className="order__wrap container">
      <div className="step-container">
          <BuyStep />
        </div>
        <Row gutter={[16, 16]}>
          <Col className="order__form" xs={24} sm={24} md={24} lg={15}>
            <Information
              isAuthenticated={isAuthenticated}
              authState={authState}
              guestState={guestState}
            />
            <Shipment
              deliveryState={deliveryState}
              onChangeDelivery={onChangeDelivery}
              style={style}
            />
            <Payment
              paymentState={paymentState}
              onChangePayment={onChangePayment}
              style={style}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} className="order__order">
            <CartInfo
              cartState={cartState}
              deliveryState={deliveryState}
              totalMoney={totalMoney}
              isProcessing={isProcessing}
              onFinish={onFinish}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  cartState: state.cart.cartState,
  auth: state.auth,
  checkout: state.checkout,
});
Order.propTypes = {
  orderProducts: PropTypes.func.isRequired,
  orderProductsAuth: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { orderProducts, orderProductsAuth })(
  Order
);
