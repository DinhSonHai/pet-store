/* eslint-disable import/no-anonymous-default-export */
import { Fragment } from "react";
import { Row, Col, Card } from "antd";
import Contact from './contact'
import AboutImg from "../../assets/img/about.png";
import {
  Store,
  Vision,
  Clients,
  Deals,
  Supports,
  Staff,
} from "../../assets/icons";
import "./styles.scss";
const About = () => {
  return (
    <Fragment>
      <section className="about">
        <div className="about__wrap container">
          <p className="about__heading">About</p>
          <h1 className="about__title">
            Về <span>chúng tôi</span>
          </h1>
          <h4 className="about__desc-head">
            PetStore không chỉ mang đến cho bạn chú cún cưng mà bạn yêu thích.
            Đến với PetStore bạn sẽ tìm cho mình được một người bạn trung thành.
          </h4>
          <div className="about__content">
            <Row gutter={[28, 0]}>
              <Col xs={24} lg={12}>
                <Card bordered={false}>
                  <img
                    src={AboutImg}
                    style={{ width: "100%", height: "100%" }}
                    alt="about_us"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card bordered={false}>
                  <p className="about_header">
                    Đến với PetStore, bạn sẽ hoàn toàn an tâm về chất lượng dịch
                    vụ, uy tín, an tâm khi mua thú cưng.
                  </p>
                  <p style={{ fontSize: "1rem" }}>
                    PetStore sở hữu đội ngũ nhân viên là các chuyên gia nhân
                    giống thú cưng chuyên nghiệp và dày dặn kinh nghiệm.
                  </p>
                  <div className="about__mission">
                    <div className="about__mission-icon">
                      <div className="about__mission-icon--wrap">
                        <Store />
                      </div>
                    </div>
                    <div className="about__mission-content">
                      <p className="about__mission-content--title">
                        Chất lượng dịch vụ hàng đầu
                      </p>
                      <p className="about__mission-content--desc">
                        PetStore. cung cấp các dịch vụ chất lượng và uy tín, đảm
                        bảo hài lòng khách hàng
                      </p>
                    </div>
                  </div>
                  <div className="about__mission">
                    <div className="about__mission-icon">
                      <div className="about__mission-icon--wrap">
                        <Vision />
                      </div>
                    </div>
                    <div className="about__mission-content">
                      <p className="about__mission-content--title">
                        Tiên phong về mua bán thú cưng
                      </p>
                      <p className="about__mission-content--desc">
                        PetStore. tự hào là đơn vị mua bán thú cưng đầu tiên
                        cũng như lớn nhất Việt Nam
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      <section className="achivements">
        <div className="achivements__wrap container">
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 16, lg: 26 },
              { xs: 32, sm: 32, md: 32 },
            ]}
          >
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="achivements__content">
                <p className="achivements__content--icon">
                  <Clients />
                </p>
                <p className="achivements__content--count">232</p>
                <p className="chivements__content--desc">Khách hàng</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="achivements__content">
                <p className="achivements__content--icon">
                  <Deals />
                </p>
                <p className="achivements__content--count">521</p>
                <p className="chivements__content--desc">Giao dịch</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="achivements__content">
                <p className="achivements__content--icon">
                  <Supports />
                </p>
                <p className="achivements__content--count">1,463</p>
                <p className="chivements__content--desc">Giờ hỗ trợ</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="achivements__content">
                <p className="achivements__content--icon">
                  <Staff />
                </p>
                <p className="achivements__content--count">15</p>
                <p className="chivements__content--desc">Nhân viên</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <Contact />
    </Fragment>
  );
};
export default About;
