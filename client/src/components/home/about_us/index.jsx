/* eslint-disable import/no-anonymous-default-export */
import { Row, Col, Card } from 'antd';
import AboutImg from '../../../img/about.png';
import { Store, Vision } from '../../../icons';
import './styles.scss';
export default () => {
  return (
    <section className='about'>
      <div className='about__wrap container'>
        <p className='about__heading'>About</p>
        <h1 className='about__title'>
          Về <span>chúng tôi</span>
        </h1>
        <h4 className='about__desc-head'>
          Ut possimus qui ut temporibus culpa velit eveniet modi omnis est
          adipisci expedita at voluptas atque vitae autem.
        </h4>
        <div className='about__content'>
          <Row gutter={[28, 0]}>
            <Col xs={24} lg={12}>
              <Card bordered={false}>
                <img
                  src={AboutImg}
                  style={{ width: '100%', height: '100%' }}
                  alt='about_us'
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card bordered={false}>
                <p className='about_header'>
                  Voluptatem dignissimos provident quasi corporis voluptates sit
                  assumenda.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className='about__mission'>
                  <div className='about__mission-icon'>
                    <div className='about__mission-icon--wrap'>
                      <Store />
                    </div>
                  </div>
                  <div className='about__mission-content'>
                    <p className='about__mission-content--title'>
                      Ullamco laboris nisi ut aliquip consequat
                    </p>
                    <p className='about__mission-content--desc'>
                      Magni facilis facilis repellendus cum excepturi quaerat
                      praesentium libre trade
                    </p>
                  </div>
                </div>
                <div className='about__mission'>
                  <div className='about__mission-icon'>
                    <div className='about__mission-icon--wrap'>
                      <Vision />
                    </div>
                  </div>
                  <div className='about__mission-content'>
                    <p className='about__mission-content--title'>
                      Ullamco laboris nisi ut aliquip consequat
                    </p>
                    <p className='about__mission-content--desc'>
                      Magni facilis facilis repellendus cum excepturi quaerat
                      praesentium libre trade
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
