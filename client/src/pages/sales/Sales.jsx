import React, { useState, useEffect } from "react";
import { ProductListLoader } from "../../components";
import { getAllSalesProducts } from "../../redux/actions/sales";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Tooltip, Rate, Divider, Statistic } from "antd";
const { Countdown } = Statistic;

const Sales = ({ sales: { salesProducts }, getAllSalesProducts }) => {
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    await getAllSalesProducts();
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="products">
      <div className="container">
        {loading ? (
          <ProductListLoader />
        ) : (
          <div className="products-list">
            <h1
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#106eea",
              }}
            >
              {salesProducts.title}
            </h1>
            {salesProducts.length <= 0 ? (
              <p style={{ textAlign: 'center' }}>Không có chương trình khuyến mãi nào.</p>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Countdown format="DD ngày HH giờ mm phút ss giây" title="Khuyến mãi còn:" value={salesProducts.to} onFinish={() => getData()}/>
              </div>
            )}
            <Divider />
            <Row
              gutter={[
                { xs: 4, sm: 8, md: 16, lg: 16 },
                { xs: 4, sm: 8, md: 16, lg: 16 },
              ]}
            >
              {salesProducts?.products?.map(({ productId: product }) => (
                <Col key={product._id} xs={12} sm={12} md={8} lg={6}>
                  <Card bordered={false} hoverable>
                    <Link
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      to={`/product/${product.productName}/${product._id}`}
                    >
                      <div className="products-list__wrap">
                        <img alt="example" src={product.images[0]} />
                      </div>
                      <div className="item-wrap">
                        <p className="products__name">
                          <Tooltip
                            placement="topLeft"
                            title={product.productName}
                          >
                            {product.productName}
                          </Tooltip>
                        </p>
                        <div>
                          <Rate
                            style={{ fontSize: "0.85rem" }}
                            disabled
                            defaultValue={product.starRatings}
                          />
                          <span
                            style={{ fontSize: "0.85rem" }}
                            className="ant-rate-text"
                          >
                            {`(${product.reviewsCount})`}
                          </span>
                        </div>
                        <p className="products__price">
                          {parseInt(
                            product.discountPrice || product.price
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                        {!!product.discountPrice && (
                          <span className="products__discount">
                            {`-${Math.ceil(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100
                            )}%`}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  sales: state.sales,
});
export default connect(mapStateToProps, { getAllSalesProducts })(Sales);
