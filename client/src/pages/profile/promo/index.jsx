import { useState, useEffect, Fragment } from "react";
import { Card, Col, Row } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPromos } from "../../../redux/actions/auth";
import dayjs from "dayjs";
import { Loader } from "../../../components";
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
      <div className="profile__main--promo">
        {!data || isLoading ? (
          <Loader className={"promo-loader"} />
        ) : (
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 16 },
              { xs: 16, sm: 16, md: 16, lg: 16 },
            ]}
          >
            {data.map((item) => (
              <Col key={item._id} xs={24} sm={12} md={12} lg={8}>
                <Card bordered={false} title={item.name}>
                  <p className="profile__main--promo-desc">
                    {item.descriptions}
                  </p>
                  <p className="profile__main--promo-date">
                    <span>Ngày hết hạn: </span>
                    {item.endDate
                      ? dayjs(item.endDate).format("HH:mm DD/MM/YYYY")
                      : "---"}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Fragment>
  );
};
ProfilePromo.propTypes = {
  getPromos: PropTypes.func.isRequired,
};
export default connect(null, { getPromos })(ProfilePromo);
