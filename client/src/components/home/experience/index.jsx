/* eslint-disable import/no-anonymous-default-export */
import './styles.scss';
import { Row, Col, Card } from 'antd';
import Ex_01 from '../../../img/ex-01.png';
import Ex_02 from '../../../img/ex-02.png';
import Ex_03 from '../../../img/ex-03.png';
import Ex_04 from '../../../img/ex-04.png';
import Ex_05 from '../../../img/ex-05.png';
import Ex_06 from '../../../img/ex-06.png';

export default () => {
  return (
    <section className='experience'>
      <div className='experience__wrap container'>
        <p className='experience__heading'>Experience</p>
        <h1 className='experience__title'>
          Về <span>trải nghiệm</span>
        </h1>
        <h4 className='experience__desc-head'>
          Những khoảnh khắc tuyệt vời được ghi nhận từ khách hàng gởi đến
          PetShop.
        </h4>
        <div className='experience__content'>
          <Row gutter={[0, 0]}>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_03}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_05}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_01}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_02}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_04}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card bordered={false}>
                <img
                  src={Ex_06}
                  width='100%'
                  height='100%'
                  alt=''
                  className='experience__image'
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
