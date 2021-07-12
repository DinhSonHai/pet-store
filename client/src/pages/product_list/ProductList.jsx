import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getProductsByType } from "../../redux/actions/products";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Pagination,
  Tooltip,
  Rate,
  Select,
} from "antd";
import { notifyActions } from "../../utils/notify";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { AddToCart } from "../../assets/icons";
import { addItem } from "../../utils/cart";
import { Link } from "react-router-dom";
import { ProductListLoader } from "../../components";
import queryString from "query-string";
import "./styles.scss";
const { Option } = Select;
const ProductList = ({
  data: { products, total },
  getProductsByType,
  match,
  location,
  history,
}) => {
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getProductsByType(match.params.id, filter, page);
      setLoading(false);
    }
    getData();
  }, [getProductsByType, match.params.id, filter, page]);
  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(
        `/products/${match.params.type}/list/${match.params.id}/?sort=${
          filter || "newest"
        }&page=${_page}`
      );
    }
    return history.push(
      `/products/${match.params.type}/list/${match.params.id}/?page=${_page}`
    );
  };

  const handleAddToCart = (item) => {
    if (item) {
      if(!item.status){
        return notifyActions("error", "Sản phẩm đã hết hàng");
      }
      const check = addItem(item);
      if (check) {
        return notifyActions("success", "Đã thêm sản phẩm vào giỏ hàng");
      }
    }
  };
  const handleChange = (value) => {
    switch (value) {
      case "newest":
        return history.push(
          `/products/${match.params.type}/list/${match.params.id}/?sort=newest`
        );
      case "asc":
        return history.push(
          `/products/${match.params.type}/list/${match.params.id}/?sort=asc`
        );
      case "desc":
        return history.push(
          `/products/${match.params.type}/list/${match.params.id}/?sort=desc`
        );
      case "name_asc":
        return history.push(
          `/products/${match.params.type}/list/${match.params.id}/?sort=name_asc`
        );
      default:
        return history.push(
          `/products/${match.params.type}/list/${match.params.id}/?sort=name_desc`
        );
    }
  };
  return (
    <section className="products">
      <div className="container">
        <div className="products__header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link className="products__header-title" to="/">
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link className="products__header-title" to="/">
                {match.params.type === "dog"
                  ? "Chó cảnh"
                  : match.params.type === "cat"
                  ? "Mèo cảnh"
                  : match.params.type === "food"
                  ? "Thức ăn"
                  : match.params.type === "accessories" && "Phụ kiện"}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="products__header-filter">
            <Select
              defaultValue={filter || "newest"}
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="asc">
                <CaretUpOutlined /> Thứ tự theo: giá thấp đến cao
              </Option>
              <Option value="desc">
                <CaretDownOutlined /> Thứ tự theo: giá cao đến thấp
              </Option>
              <Option value="name_asc">
                <CaretUpOutlined /> Thứ tự theo: A - Z
              </Option>
              <Option value="name_desc">
                <CaretDownOutlined /> Thứ tự theo: Z - A
              </Option>
            </Select>
          </div>
        </div>
        {loading ? (
          <ProductListLoader />
        ) : (
          <div className="products-list">
            <Row
              gutter={[
                { xs: 4, sm: 8, md: 16, lg: 16 },
                { xs: 4, sm: 8, md: 16, lg: 16 },
              ]}
            >
              {products.map((product) => (
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
                          {parseInt(product.discountPrice || product.price).toLocaleString("vi-VN", {
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
                  <Button
                    disabled={product.status ? false : true}
                    onClick={() => handleAddToCart(product)}
                    className="addToCart"
                    icon={<AddToCart />}
                    type="primary"
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        <Pagination
          onChange={handlePagination}
          disabled={loading}
          current={!page ? 1 : parseInt(page)}
          responsive={true}
          pageSize={12}
          total={total}
          showSizeChanger={false}
          style={{ textAlign: "center", margin: "3rem 0 1rem 0" }}
        />
      </div>
    </section>
  );
};

ProductList.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getProductsByType })(ProductList);
