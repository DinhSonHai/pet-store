import React, { useState, Fragment } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, Button, Space } from "antd";
import { CheckoutPromoModal } from "../../../components";
import dayjs from "dayjs";

const Promo = ({ cartState, promo, setPromo }) => {
  const [showPromoModal, setShowPromoModal] = useState(false);
  return (
    <Fragment>
      <Card
        bordered={false}
        style={{ marginBottom: "1rem" }}
        title="Chọn promo"
        className="checkout-promo-modal"
      >
        <Space direction="vertical" size={32}>
          <Button
            onClick={() => setShowPromoModal(true)}
            type="link"
            icon={<PlusOutlined />}
          >
            Chọn promo
          </Button>
          {promo && (
            <Card
              bordered={false}
              title={promo.name}
              extra={
                <CloseOutlined
                  style={{ color: "#dc3545" }}
                  onClick={() => setPromo(null)}
                />
              }
            >
              <p className="checkout-promo-modal-desc">{promo.descriptions}</p>
              <p className="checkout-promo-modal-date">
                <span>Ngày hết hạn: </span>
                {promo.endDate
                  ? dayjs(promo.endDate).format("HH:mm DD/MM/YYYY")
                  : "---"}
              </p>
            </Card>
          )}
        </Space>
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
