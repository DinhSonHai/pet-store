import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";

const CartInfo = ({
  paymentState,
  cardComplete,
  cartState,
  deliveryState,
  totalMoney,
  isProcessing,
  onFinish,
}) => {
  return (
    <Card
      bordered={false}
      extra={
        <div className="checkout__update-cart">
          <CaretLeftOutlined />
          <Link to="/cart">Sửa đơn hàng</Link>
        </div>
      }
      title="Đơn hàng"
    >
      <div className="order__products">
        {cartState.map((item) => (
          <div key={item._id} className="order__products--content">
            <img
              width="50"
              height="50"
              style={{ objectFit: "cover" }}
              src={item.image}
              alt="Cart"
            />

            <div className="order__products--info">
              <p className="order__products--name">{item.productName}</p>
              <p className="order__products--price">
                {parseInt(item.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
                <span
                  className="order__products--amount"
                  style={{ margin: "0 1rem" }}
                >
                  {"x" + item.amount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="order__fee">
        <span>Phí vận chuyển: </span>
        <span>
          {parseInt(deliveryState.price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <p className="order__total">
        <span>Tổng tiền: </span>
        <span id="order__total">
          {parseInt(totalMoney).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <Button
        disabled={paymentState === 1 && !cardComplete}
        loading={isProcessing}
        onClick={onFinish}
        block 
        type="primary">
        Đặt hàng
      </Button>
    </Card>
  );
};
export default CartInfo;
