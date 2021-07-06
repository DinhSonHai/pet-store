/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Loader } from "../../../components";
import { getPromos } from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { notifyActions } from "../../../utils/notify";
import { Link } from "react-router-dom";
import "./style.scss";

const CheckoutPromoModal = ({
  cartState,
  showPromoModal,
  setShowPromoModal,
  setPromo,
  promo,
  getPromos,
  auth: { isAuthenticated, user },
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    const { _id, discountCondition } = item;
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
                  <Card
                    bordered={false}
                    title={item.name}
                    extra={
                      promo?._id === item._id ? (
                        <Button
                          onClick={() => handleCancel(false)}
                          danger
                          type="link"
                        >
                          Hủy
                        </Button>
                      ) : (
                        <Button onClick={() => onFinish(item)} type="link">
                          Chọn
                        </Button>
                      )
                    }
                  >
                    <p className="checkout-promo-modal-desc">
                      {item.descriptions}
                    </p>
                    <p className="checkout-promo-modal-date">
                      <span>Ngày hết hạn: </span>
                      {item.endDate
                        ? dayjs(item.endDate).format("HH:mm DD/MM/YYYY")
                        : "---"}
                    </p>
                  </Card>
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
export default connect(mapStateToProps, { getPromos })(CheckoutPromoModal);
