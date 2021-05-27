import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { Card, Tooltip, Rate } from "antd";
import "./styles.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1023 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1023, min: 740 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 739, min: 0 },
    items: 2,
  },
};
const ShowHomeProducts = ({
  type,
  products
}) => {
  return (
    <section className="show-products">
      <div className="show-products__wrap container">
        <p className="show-products__heading">
          {" "}
          {`${type === "newest"
              ? "Newest"
              : type === "popular"
                ? "Popular"
                : "Best Seller"
            } Products`}
        </p>
        <h1 className="show-products__title">
          Sản phẩm{" "}
          <span>{`${type === "newest"
              ? "mới nhất"
              : type === "popular"
                ? "ưa chuộng"
                : "bán chạy"
            }`}</span>
        </h1>
        <Carousel infinite ssr partialVisbile responsive={responsive}>
          {products.map((product) => (
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
                  <img
                    width="100%"
                    height="100%"
                    alt="example"
                    src={product.images[0]}
                  />
                </div>
                <div>
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
                    {parseInt(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ShowHomeProducts

