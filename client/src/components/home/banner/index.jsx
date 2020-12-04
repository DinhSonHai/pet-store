/* eslint-disable import/no-anonymous-default-export */
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import Slider from 'infinite-react-carousel';
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
export default () => {
  const settings = {
    arrows: false,
    arrowsBlock: false,
    autoplay: true,
    dots: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };
  return (
    <section className='banner'>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Slider {...settings}>
            {bannerList.map((imageUrl, index) => (
              <Link
                style={{ display: 'block', height: '100%' }}
                key={index}
                to='/'
              >
                <img width='100%' height='100%' src={imageUrl} alt='No_Image' />
              </Link>
            ))}
          </Slider>
        </Col>
        <Col xs={24} lg={10}>
          <Row gutter={[16, 16]}>
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
