/* eslint-disable import/no-anonymous-default-export */
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import './styles.scss';

const bannerList = [
  'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-1.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-2.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-3.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-4.jpg',
];

const bannerListSide = [
  'https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-cho-banner.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-meo-banner.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2020/06/cham-soc-cho-meo-banner.jpg',
  'https://petshopsaigon.vn/wp-content/uploads/2020/06/suc-khoe-cho-meo-banner.jpg',
];
const Banner = () => {
  return (
    <section className='banner'>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Carousel
            interval={4000}
            transitionTime={750}
            showStatus={false}
            renderThumbs={() => null}
            showArrows={true}
            autoPlay={true}
            swipeable={true}
            infiniteLoop={true}
          >
            {bannerList.map((img, index) => (
              <div key={index}>
                <img
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                  src={img}
                  alt='No_Image'
                />
              </div>
            ))}
          </Carousel>
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
                <Link to='/'>
                  <img
                    width='100%'
                    height='100%'
                    src={imageUrl}
                    alt='No_Image'
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
