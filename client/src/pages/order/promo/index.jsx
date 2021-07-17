import React, { useState, Fragment } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import { CheckoutPromoModal, Coupon } from "../../../components";

const Promo = ({ cartState, promo, setPromo }) => {
  const [showPromoModal, setShowPromoModal] = useState(false);
  return (
    <Fragment>
      <Card
        bordered={false}
        style={{ marginBottom: "1rem" }}
        title="Chọn promotion"
        className="checkout-promo-modal"
      >
        <Button
          onClick={() => setShowPromoModal(true)}
          type="link"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
        >
          Chọn promotion
        </Button>
        {promo && <Coupon item={promo} setPromo={setPromo} isSelected />}
      </Card>
      <CheckoutPromoModal
        cartState={cartState}
        promo={promo}
        setPromo={setPromo}
        showPromoModal={showPromoModal}
        setShowPromoModal={setShowPromoModal}
      />
    </Fragment>
  );
};

export default Promo;
