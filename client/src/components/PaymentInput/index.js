// import React from 'react';
// import PropTypes from 'prop-types';

// import './styles.scss';

// PaymentInput.propTypes = {
//   error: PropTypes.object,
//   onChange: PropTypes.func,
// };

// PaymentInput.defaultProps = {
//   error: {},
//   onChange: () => { },
// };

// const options = {
//   hidePostalCode: true,
//   style: {
//     base: {
//       iconColor: "#000",
//       fontSize: "16px",
//       color: "#000",
//       letterSpacing: "0.025em",
//       "::placeholder": {
//         color: "#666"
//       }
//     },
//     invalid: {
//       iconColor: "red",
//       color: "red"
//     }
//   }
// }

// function PaymentInput({ element, error, onChange }) {

//   return (
//     <div className="payment-input">
//       <label>
//         Số thẻ
//         <CardElement
//           options={options}
//           onReady={() => {
//             console.log("CardElement [ready]");
//           }}
//           onChange={onChange}
//           onBlur={() => {
//             console.log("CardElement [blur]");
//           }}
//           onFocus={() => {
//             console.log("CardElement [focus]");
//           }}
//         />
//       </label>
//       {error && (
//         <div className="error-message">
//           {error.message}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentInput;