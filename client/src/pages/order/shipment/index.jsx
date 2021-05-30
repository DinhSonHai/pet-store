import React from "react";
import { Card, Radio } from "antd";

const Shipment = ({ onChangeDelivery, deliveryState, style }) => {
  return (
    <Card
      bordered={false}
      style={{ marginBottom: "1rem" }}
      title="Chọn hình thức giao hàng"
    >
      <Radio.Group onChange={onChangeDelivery} value={deliveryState.value}>
        <Radio style={style} value={0}>
          {`Giao hàng tiêu chuẩn  :  ${parseInt(35000).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}`}
        </Radio>
        <Radio style={style} value={1}>
          {`Giao hàng nhanh  :  ${parseInt(55000).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}`}
        </Radio>
      </Radio.Group>
    </Card>
  );
};

export default Shipment