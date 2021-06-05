import React from "react";
import { Radio } from "antd";

const Payment = ({ onChangePayment, paymentState, style }) => {
  return (
    <>
      <Radio.Group onChange={onChangePayment} value={paymentState}>
        <Radio style={style} value={0}>
          Thanh toán tiền mặt khi nhận hàng (COD)
        </Radio>
        <Radio style={style} value={1}>
          Thanh toán online
        </Radio>
      </Radio.Group>
    </>
  );
};

export default Payment;