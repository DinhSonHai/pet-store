import React from "react";
import { Steps } from "antd";
import { useLocation } from "react-router-dom";
import './styles.scss'

const { Step } = Steps;
const BuyStep = () => {
  const location = useLocation();
  const getCurrentStep = () => {
    if (location.pathname.includes("checkout")) return 0;
    return 1;
  };
  return (
    <div className="buy-step">
      <Steps responsive size="small" current={getCurrentStep()}>
        <Step title="Thông tin giao hàng" />
        <Step title="Thanh toán và đặt hàng" />
      </Steps>
    </div>
  );
};
export default BuyStep;
