import { useState, useEffect, Fragment } from "react";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPromos } from "../../../redux/actions/auth";
import { Loader, Coupon } from "../../../components";
import "./styles.scss";
const ProfilePromo = ({ getPromos }) => {
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
    getProducts();
    return () => (flag = false);
  }, [getPromos]);

  return (
    <Fragment>
      <h3 className="profile__title">Ưu đãi ({data.length})</h3>
      {!data || isLoading ? (
        <Loader className={"promo-loader"} />
      ) : (
        <div className="profile__main--promo">
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 16 },
              { xs: 16, sm: 16, md: 16, lg: 16 },
            ]}
          >
            {data.map((item) => (
              <Col key={item._id} xs={24} sm={24} md={12} lg={12}>
                <Coupon item={item} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Fragment>
  );
};
ProfilePromo.propTypes = {
  getPromos: PropTypes.func.isRequired,
};
export default connect(null, { getPromos })(ProfilePromo);
