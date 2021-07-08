/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Loader, Coupon } from "../../../components";
import { getPromos, getPromoByName } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { notifyActions } from "../../../utils/notify";
import { Link } from "react-router-dom";
import "./style.scss";

const { Search } = Input;

const CheckoutPromoModal = ({
  cartState,
  showPromoModal,
  setShowPromoModal,
  setPromo,
  promo,
  getPromos,
  getPromoByName,
  auth: { isAuthenticated, user },
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    let flag = true;
    async function getProducts() {
      setIsLoading(true);
      const res = await getPromos();
      if (res && flag) {
        setData(res);
      }
      setIsLoading(false);
    }
    if (isAuthenticated) {
      getProducts();
    }
    return () => (flag = false);
  }, [getPromos]);

  const handleCancel = (check) => {
    setPromo(null);
    if (check) {
      setShowPromoModal(false);
    }
  };
  const onFinish = (item) => {
    const totalMoney = cartState?.reduce((a, b) => a + b.price * b.amount, 0);
    const { _id, discountCondition, endDate } = item;
    const end = endDate && new Date(endDate);
    const now = new Date(Date.now());
    if (end && now.getTime() >= end.getTime()) {
      return notifyActions("error", "Mã giảm giá đã hết hạn sử dụng!");
    }
    if (discountCondition && discountCondition > totalMoney) {
      return notifyActions("error", "Đơn hàng không đạt điều kiện áp dụng!");
    }
    if (user.promos?.includes(_id)) {
      return notifyActions(
        "error",
        "Bạn đã sử dụng phiếu mua hàng này rồi! Vui lòng thử lại."
      );
    }
    setPromo(item);
    setShowPromoModal(false);
  };
  const onApply = async (value) => {
    if (value) {
      setIsProcessing(true);
      const data = await getPromoByName(value);
      setIsProcessing(false);
      if (data) {
        onFinish(data);
      }
    }
  };
  return (
    <Modal
      bodyStyle={{ maxHeight: "700px", overflowY: "scroll" }}
      title={"Thêm promo"}
      visible={showPromoModal}
      onOk={onFinish}
      onCancel={() => setShowPromoModal(false)}
      footer={false}
      className="checkout-promo-modal"
    >
      {isAuthenticated && (
        <div style={{ marginBottom: "1.5rem" }}>
          <Search
            placeholder="Nhập mã giảm giá..."
            allowClear
            enterButton="Áp dụng"
            size="large"
            onSearch={onApply}
            loading={isProcessing}
          />
        </div>
      )}
      {!data || isLoading ? (
        <Loader className={"promo-loader"} />
      ) : (
        <Row
          gutter={[
            { xs: 16, sm: 16, md: 16, lg: 16 },
            { xs: 16, sm: 16, md: 16, lg: 16 },
          ]}
        >
          {isAuthenticated ? (
            data.length === 0 ? (
              <p style={{ fontSize: "1.05rem", textAlign: "center" }}>
                Không có ưu đãi nào lúc này, vui lòng chờ dịp khác bạn nha{" "}
                <SmileOutlined /> !
              </p>
            ) : (
              data.map((item) => (
                <Col key={item._id} xs={24} sm={24} md={24} lg={24}>
                  <Coupon
                    item={item}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    promo={promo}
                    isModal
                  />
                </Col>
              ))
            )
          ) : (
            <p style={{ fontSize: "1.05rem", textAlign: "center" }}>
              Bạn cần <Link to="signin">đăng nhập</Link> để sử dụng tính năng
              này, nếu chưa có tài khoản hãy <Link to="signup">đăng ký</Link> để
              nhận được nhiều ưu đãi khủng từ PetStore bạn nhé <SmileOutlined />{" "}
              !
            </p>
          )}
        </Row>
      )}
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => handleCancel(true)}>Hủy</Button>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getPromos, getPromoByName })(
  CheckoutPromoModal
);
