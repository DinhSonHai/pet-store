import React from 'react';
import PropTypes from 'prop-types';
import {
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

import './styles.scss';

PaymentInput.propTypes = {
  
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
        color: "#666"
      }
    },
    invalid: {
      iconColor: "red",
      color: "red"
    }
  }
}

function PaymentInput(props) {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className="payment-input">
      <label>
        Số thẻ
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      {/* {error && (
        <div className="ErrorMessage">
          {error.message}
        </div>
      )} */}
    </div>
  );
}

export default PaymentInput;