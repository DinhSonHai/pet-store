import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getSearchProductsList } from "../../redux/actions/products";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  Button,
  message,
  Pagination,
  Rate,
  Tooltip,
  Select,
} from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { AddToCart } from "../../assets/icons";
import { addItem } from "../../utils/cart";
import { Loader } from "../../components";
import { Link } from "react-router-dom";
import queryString from "query-string";
import "./styles.scss";
const { Option } = Select;

const SearchList = ({
  data: { products, total },
  getSearchProductsList,
  location,
  history,
}) => {
  let q = queryString.parse(location.search).q;
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getSearchProductsList(q, filter, page);
      setLoading(false);
    }
    getData();
  }, [getSearchProductsList, q, filter, page]);

  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(
        `/products/search?q=${q}&sort=${filter || "newest"}&page=${_page}`
      );
    }
    return history.push(`/products/search?q=${q}&page=${_page}`);
  };
  const handleAddToCart = (item) => {
    if (item) {
      const check = addItem(item);
      if (check) {
        return message.success("Đã thêm sản phẩm vào giỏ hàng");
      }
    }
  };
  const handleChange = (value) => {
    switch (value) {
      case "newest":
        return history.push(`/products/search?q=${q}&sort=newest`);
      case "asc":
        return history.push(`/products/search?q=${q}&sort=asc`);
      case "desc":
        return history.push(`/products/search?q=${q}&sort=desc`);
      case "name_asc":
        return history.push(`/products/search?q=${q}&sort=name_asc`);
      default:
        return history.push(`/products/search?q=${q}&sort=name_desc`);
    }
  };

  return (
    <section className="products">
      <div className="container">
        <div className="products__header">
          {`Kết quả tìm kiếm cho "${q}" (${products.length})`}
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
        <div className="products-list">
          {loading && <Loader className="product-loader" />}
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
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <img
                        width="100%"
                        height="100%"
                        alt="example"
                        src={product.images[0]}
                      />
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

SearchList.propTypes = {
  getSearchProductsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getSearchProductsList })(SearchList);
