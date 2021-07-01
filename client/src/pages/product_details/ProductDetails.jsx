/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Rate, Button, Tabs, Breadcrumb, Divider } from "antd";
import { MenuOutlined, StarOutlined } from "@ant-design/icons";
import { AddToCartDetail } from "../../assets/icons";
import { FavoriteAction } from "../../components";
import DetailDescription from "./description";
import DetailReview from "./review";
import DetailComments from "./comments";
import { getProductById } from "../../redux/actions/products";
import { addItem } from "../../utils/cart";
import { notifyActions } from "../../utils/notify";
import { Loader } from "../../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { ShowHomeProducts, SocialShare } from "../../components";
import { productAPI } from "../../api";
import "./styles.scss";

const { TabPane } = Tabs;
const ProductDetails = ({
  getProductById,
  match,
  data,
  auth: { user, isAuthenticated },
}) => {
  const [loading, setLoading] = useState(false);
  const [tabChange, setTabChange] = useState("description");
  const onTabChange = (key) => {
    setTabChange(key);
  };
  const [sameProducts, setSameProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getProductById(match.params.id);
      setLoading(false);
    }
    getData();
  }, [getProductById, match.params.id]);
  useEffect(() => {
    async function getData() {
      if (data) {
        const { _id, typeId } = data;
        const res = await productAPI.get_same_type(typeId);
        const mapData = res.data.filter((item) => item._id !== _id);
        setSameProducts(mapData);
      }
    }
    getData();
  }, [data]);
  const handleAddToCart = (item) => {
    if (item) {
      const check = addItem(item);
      if (check) {
        notifyActions("success", "Đã thêm sản phẩm vào giỏ hàng");
      }
    }
  };
  return (
    <section className="product-details">
      <div className="container">
        <Breadcrumb style={{ marginBottom: "2rem" }}>
          <Breadcrumb.Item>
            <Link className="product-type__header-title" to="/">
              Trang chủ
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="product-type__header-title">
              {match.params.productName}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="product-details__content">
          {loading || !data ? (
            <Loader className="product-loader" />
          ) : (
            <Fragment>
              <div className="product-details__wrap">
                <Row gutter={[16, 0]}>
                  <Col
                    className="product-details__images"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                  >
                    <ImageGallery
                      thumbnailPosition="left"
                      showPlayButton={false}
                      items={data.images.map((item) => ({
                        original: item,
                        thumbnail: item,
                      }))}
                    />
                  </Col>
                  <Col
                    className="product-details__card-info"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                  >
                    <Card
                      bordered={false}
                      actions={[
                        <FavoriteAction
                          isAuthenticated={isAuthenticated}
                          data={data}
                          user={user}
                          favoriteState={data.isFavorite}
                        />,
                        <Button
                          disabled={data.status ? false : true}
                          style={{ height: "100%" }}
                          block
                          type="text"
                          icon={<AddToCartDetail />}
                          onClick={() => handleAddToCart(data)}
                        />,
                      ]}
                    >
                      <p style={{ fontSize: "1.2rem" }}>{data.productName}</p>
                      <p>
                        <b>Tình trạng: </b>
                        <span
                          style={{
                            color: data.status
                              ? "var(--success-color)"
                              : "var(--danger-color)",
                          }}
                        >
                          {data.status ? "Còn hàng" : "Hết hàng"}
                        </span>
                      </p>
                      <p>
                        <b>Giá : </b>
                        <span style={{ fontSize: "1.2rem", color: "#106eea" }}>
                          {parseInt(
                            data.discountPrice || data.price
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        {!!data.discountPrice && (
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "#4a4a4a",
                              textDecoration: "line-through",
                              margin: "0 0.5rem",
                            }}
                          >
                            {parseInt(data.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        )}
                        {!!data.discountPrice && (
                          <span className="products__discount">
                            {`-${Math.ceil(
                              ((data.price - data.discountPrice) / data.price) *
                                100
                            )}%`}
                          </span>
                        )}
                      </p>
                      <Rate disabled defaultValue={data.starRatings} />
                      <span className="ant-rate-text">
                        {data.starRatings <= 0
                          ? "Chưa có đánh giá nào"
                          : `${data.reviewsCount} đánh giá`}
                      </span>
                      <SocialShare />
                    </Card>
                  </Col>
                </Row>
              </div>
              <Tabs
                onTabClick={onTabChange}
                defaultActiveKey={tabChange}
                type="card"
              >
                <TabPane
                  tab={
                    <span>
                      <MenuOutlined />
                      Mô tả
                    </span>
                  }
                  key="description"
                >
                  <DetailDescription
                    desc={data.description}
                    tabChange={tabChange}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <StarOutlined />
                      Đánh giá
                    </span>
                  }
                  key="review"
                >
                  <DetailReview
                    id={data._id}
                    isReviewed={data.isReviewed}
                    isPurchased={data.isPurchased}
                    tabChange={tabChange}
                  />
                  <DetailComments id={data._id} tabChange={tabChange} />
                </TabPane>
              </Tabs>
            </Fragment>
          )}
        </div>
        <Divider />
        <ShowHomeProducts type="detail" products={sameProducts} />
      </div>
    </section>
  );
};

ProductDetails.propTypes = {
  getProductById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProductById })(ProductDetails);
