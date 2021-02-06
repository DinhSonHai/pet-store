/* eslint-disable import/no-anonymous-default-export */
import { Row, Col } from 'antd';
import { Clients, Deals, Supports, Staff } from '../../../icons';
import './styles.scss';
export default () => {
  return (
    <section className='achivements'>
      <div className='achivements__wrap container'>
        <Row
          gutter={[
            { xs: 16, sm: 16, md: 16, lg: 26 },
            { xs: 32, sm: 32, md: 32 },
          ]}
        >
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Clients />
              </p>
              <p className='achivements__content--count'>232</p>
              <p className='chivements__content--desc'>Khách hàng</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Deals />
              </p>
              <p className='achivements__content--count'>521</p>
              <p className='chivements__content--desc'>Giao dịch</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Supports />
              </p>
              <p className='achivements__content--count'>1,463</p>
              <p className='chivements__content--desc'>Giờ hỗ trợ</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Staff />
              </p>
              <p className='achivements__content--count'>15</p>
              <p className='chivements__content--desc'>Nhân viên</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
