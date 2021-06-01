import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentInput from '../PaymentInput';
import './styles.scss';

StripeContainer.propTypes = {
  
};

const PUBLIC_KEY = "pk_test_51IvmIRJiEjfuJbiQgaBBynYph42Zp0k82dOg0dybG8l5V9RBlmVIEusGFkxGzERQYnhVuD8j7blRirxdtvSjkjRZ00FWXIqwOZ";

const stripePromise = loadStripe(PUBLIC_KEY);

function StripeContainer(props) {
  return (
    <div className="stripe-container">
      <Elements stripe={stripePromise}>
        <PaymentInput />
      </Elements>
    </div>
  );
}

export default StripeContainer;