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
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
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
    </div>
  );
}

export default PaymentInput;