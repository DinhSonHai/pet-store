/* eslint-disable import/no-anonymous-default-export */
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import ImageGallery from "react-image-gallery";
import "./styles.scss";

const bannerList = [
  "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-1.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-2.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-3.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-4.jpg",
];

const bannerListSide = [
  "https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-cho-banner.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-meo-banner.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2020/06/cham-soc-cho-meo-banner.jpg",
  "https://petshopsaigon.vn/wp-content/uploads/2020/06/suc-khoe-cho-meo-banner.jpg",
];
const Banner = () => {
  return (
    <section className="banner">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <ImageGallery
            autoPlay
            showBullets
            showNav={false}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            items={bannerList.map((item) => ({
              original: item,
              thumbnail: item,
            }))}
          />
        </Col>
        <Col xs={24} lg={10}>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 16, lg: 16 },
              { xs: 8, sm: 16, md: 16, lg: 16 },
            ]}
          >
            {bannerListSide.map((imageUrl, index) => (
              <Col key={index} xs={12} lg={12}>
                <Link to="/">
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                    src={imageUrl}
                    alt="No_Image"
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  );
};
export default Banner;
