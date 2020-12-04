/* eslint-disable import/no-anonymous-default-export */
import './styles.scss';
import { Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <section className='footer'>
      <div className='footer__wrap container'>
        <Row gutter={[28, 28]}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <h1 className='footer__logo'>PetStore.</h1>
            <div className='footer__address'>
              <p className='footer__address--item'>484 Lê Văn Việt</p>
              <p className='footer__address--item'>Phường Tăng Nhơn Phú A</p>
              <p className='footer__address--item'>Quận 9 - Tp.HCM</p>
            </div>
            <div className='footer__contact'>
              <p className='footer__phone'>
                <span>Phone: </span> +84 385 639 830
              </p>
              <p className='footer__email'>
                <span>Email: </span> ducdao0906@gmail.com
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <h1 className='footer__link'>Danh mục</h1>
            <p>
              {' '}
              <Link className='footer__link--item' to='/'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Trang chủ
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__link--item' to='/services'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Dịch vụ
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__link--item' to='/about'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Về chúng tôi
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__link--item' to='/pets'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Thú cưng
              </Link>
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <h1 className='footer__privacy'>Chính sách</h1>
            <p>
              {' '}
              <Link className='footer__privacy--item' to='/'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Vận chuyển
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__privacy--item' to='/'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Thanh toán
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__privacy--item' to='/'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Bảo hành
              </Link>
            </p>
            <p>
              {' '}
              <Link className='footer__privacy--item' to='/'>
                <RightOutlined style={{ fontSize: '0.75rem' }} /> Trả góp
              </Link>
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <h1 className='footer__social'>Kết nối với chúng tôi</h1>
            <div className='footer__contact'>
              <p className='footer__phone'>
                <span>Phone: </span> +84 385 639 830
              </p>
              <p className='footer__email'>
                <span>Email: </span> ducdao0906@gmail.com
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
