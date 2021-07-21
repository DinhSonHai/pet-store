/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Col, Row, Card } from "antd";
import equal from "fast-deep-equal";
import { connect } from "react-redux";
import { orderProducts, orderProductsAuth } from "../../redux/actions/order";
import Payment from "./payment";
import Shipment from "./shipment";
import CartInfo from "./cart";
import Promo from "./promo";
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

const options = {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#000",
      fontSize: "16px",
      color: "#000",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#666",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const Order = ({
  cartState,
  history,
  auth: { isAuthenticated },
  checkout: { guestState, authState },
  orderProducts,
  orderProductsAuth,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [promo, setPromo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [deliveryState, SetDeliveryState] = useState({
    value: 0,
    price: 35000,
  });
  const [paymentState, SetPaymentState] = useState(0);
  const [cardComplete, setCardComplete] = useState(false);
  const [error, setError] = useState(null);

  const handleCardChange = (e) => {
    setError(e.error);
    setCardComplete(e.complete);
  };

  const onChangeDelivery = (e) => {
    SetDeliveryState({
      ...deliveryState,
      value: e.target.value,
      price: e.target.value === 0 ? 35000 : 55000,
    });
  };

  const onChangePayment = (e) => {
    const paymentState = e.target.value;
    SetPaymentState(paymentState);
    setCardComplete(false);
  };

  const onFinish = async () => {
    let payload = {};
    if (paymentState === 1 && cardComplete) {
      if (!stripe || !elements) {
        return;
      }

      payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (payload?.error) {
        setError({ message: "Stripe payment error! Please try again later." });
        return;
      }
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!equal(cart, cartState)) {
      return history.push("/cart");
    }
    setIsProcessing(true);
    let res;
    if (isAuthenticated) {
      authState.promoId = promo?._id;
      res = await orderProductsAuth({
        ...authState,
        paymentId: payload?.paymentMethod?.id,
      });
    } else {
      res = await orderProducts({
        ...guestState,
        paymentId: payload?.paymentMethod?.id,
      });
    }
    setIsProcessing(false);
    if (res) {
      store.dispatch({
        type: REMOVE_CART,
      });
      store.dispatch({
        type: CLEAR_CHECKOUT_INFO,
      });
      localStorage.removeItem("cart");
    }
  };

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
      const total_value = cartState.reduce((a, b) => a + (b.discountPrice || b.price) * b.amount, 0);
      let promoDeduction = 0;
      if (promo && isAuthenticated) {
        if (promo.discountType === "percent") {
          promoDeduction = (promo.discountValue / 100) * total_value;
        }
        if (promo.discountType === "cash") {
          promoDeduction = promo.discountValue;
        }
      }
      const total_final = total_value + deliveryState.price - promoDeduction;
      setTotalMoney(total_final);
      if (isAuthenticated) {
        store.dispatch({
          type: UPDATE_AUTH_INFO,
          payload: {
            deliveryState: deliveryState.value,
            paymentState,
            totalMoney: total_final,
          },
        });
        return;
      }
      store.dispatch({
        type: UPDATE_GUEST_INFO,
        payload: {
          deliveryState: deliveryState.value,
          paymentState,
          totalMoney: total_final,
        },
      });
    }
  }, [cartState, deliveryState, paymentState, isAuthenticated, promo]);

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
            <Card
              style={{ marginBottom: "1rem" }}
              bordered={false}
              title="Chọn hình thức thanh toán"
            >
              <Payment
                paymentState={paymentState}
                setCardComplete={setCardComplete}
                onChangePayment={onChangePayment}
                style={style}
              />
              {paymentState === 1 && (
                <div className="payment-input">
                  <label>
                    Số thẻ
                    <CardElement
                      options={options}
                      onChange={handleCardChange}
                    />
                  </label>
                  {error && (
                    <div className="error-message">{error.message}</div>
                  )}
                </div>
              )}
            </Card>
            <Promo promo={promo} setPromo={setPromo} cartState={cartState} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} className="order__order">
            <CartInfo
              promo={promo}
              paymentState={paymentState}
              cardComplete={cardComplete}
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
