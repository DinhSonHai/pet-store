import React from "react";
import { Card, Radio } from "antd";

const Payment = ({ onChangePayment, paymentState, style }) => {
  return (
    <Card bordered={false} title="Chọn hình thức thanh toán">
      <Radio.Group onChange={onChangePayment} value={paymentState}>
        <Radio style={style} value={0}>
          Thanh toán tiền mặt khi nhận hàng (COD)
        </Radio>
      </Radio.Group>
    </Card>
  );
};

export default Payment;