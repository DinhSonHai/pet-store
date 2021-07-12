/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import { Card, Rate, Button, Pagination } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavorite, updateFavorite } from "../../../redux/actions/auth";
import { Link } from "react-router-dom";
import { Loader } from "../../../components";
import "./styles.scss";
const ProfileWishList = ({ getFavorite, updateFavorite }) => {
  const [data, setData] = useState({ payload: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let flag = true;
    async function getProducts() {
      setIsLoading(true);
      const res = await getFavorite(page);
      if (res && flag) {
        setData({ ...data, payload: res.data, total: res.total });
      }
      setIsLoading(false);
    }
    getProducts();
    return () => (flag = false);
  }, [getFavorite, page]);

  const handleUnFavorite = async (id) => {
    setIsProcessing(true);
    const updatedData = data?.payload.filter((item) => item._id !== id);
    setData({ ...data, payload: updatedData, total: data.total - 1 });
    await updateFavorite(id);
    setIsProcessing(false);
  };

  const handlePagination = async (_page) => {
    setPage(_page);
  };

  return (
    <Fragment>
      <h3 className="profile__title">Sản phẩm yêu thích ({data?.total})</h3>
      <div className="profile__main--wishlist">
        {!data?.payload || isLoading ? (
          <Loader className={"wishlist-loader"} />
        ) : (
          data?.payload.map((item) => (
            <Card
              bordered={false}
              style={{ marginBottom: "0.5rem" }}
              key={item._id}
            >
              <div className="profile__main--wishlist-wrap">
                <img
                  src={item.image}
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                  alt="product"
                />
                <div className="profile__main--wishlist-content">
                  <p className="profile__main--wishlist-name">
                    <Link to={`/product/${item.productName}/${item._id}`}>
                      {item.productName}
                    </Link>
                  </p>
                  <div className="profile__main--wishlist-rate">
                    <Rate
                      style={{ fontSize: "0.8rem" }}
                      disabled
                      defaultValue={item.starRatings}
                    />
                  </div>
                  <p className="profile__main--wishlist-price">
                    {parseInt(item.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <Button
                    disabled={isProcessing}
                    onClick={() => handleUnFavorite(item._id)}
                    type="text"
                    danger
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Pagination
            onChange={handlePagination}
            current={page}
            responsive={true}
            pageSize={5}
            size="small"
            total={data?.total}
          />
        </div>
      </div>
    </Fragment>
  );
};
ProfileWishList.propTypes = {
  getFavorite: PropTypes.func.isRequired,
  updateFavorite: PropTypes.func.isRequired,
};
export default connect(null, { getFavorite, updateFavorite })(ProfileWishList);
