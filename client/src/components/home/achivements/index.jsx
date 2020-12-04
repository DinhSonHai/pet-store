/* eslint-disable import/no-anonymous-default-export */
import { Row, Col } from 'antd';
import { Clients, Deals, Supports, Staff } from '../../../icons';
import './styles.scss';
export default () => {
  return (
    <section className='achivements'>
      <div className='achivements__wrap container'>
        <Row gutter={[26, 32]}>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Clients />
              </p>
              <p className='achivements__content--count'>232</p>
              <p className='chivements__content--desc'>Happy Clients</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Deals />
              </p>
              <p className='achivements__content--count'>521</p>
              <p className='chivements__content--desc'>Deals</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Supports />
              </p>
              <p className='achivements__content--count'>1,463</p>
              <p className='chivements__content--desc'>Hours Of Support</p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <div className='achivements__content'>
              <p className='achivements__content--icon'>
                <Staff />
              </p>
              <p className='achivements__content--count'>15</p>
              <p className='chivements__content--desc'>Hard Workers</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
