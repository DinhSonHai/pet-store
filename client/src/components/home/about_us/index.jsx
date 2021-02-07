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
          PetStore không chỉ mang đến cho bạn chú cún cưng mà bạn yêu thích. Đến
          với PetStore bạn sẽ tìm cho mình được một người bạn trung thành.
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
                  Đến với PetStore, bạn sẽ hoàn toàn an tâm về chất lượng dịch
                  vụ, uy tín, an tâm khi mua thú cưng.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  PetStore sở hữu đội ngũ nhân viên là các chuyên gia nhân giống
                  thú cưng chuyên nghiệp và dày dặn kinh nghiệm.
                </p>
                <div className='about__mission'>
                  <div className='about__mission-icon'>
                    <div className='about__mission-icon--wrap'>
                      <Store />
                    </div>
                  </div>
                  <div className='about__mission-content'>
                    <p className='about__mission-content--title'>
                      Chất lượng dịch vụ hàng đầu
                    </p>
                    <p className='about__mission-content--desc'>
                      PetStore. cung cấp các dịch vụ chất lượng và uy tín, đảm
                      bảo hài lòng khách hàng
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
                      Tiên phong về mua bán thú cưng
                    </p>
                    <p className='about__mission-content--desc'>
                      PetStore. tự hào là đơn vị mua bán thú cưng đầu tiên cũng
                      như lớn nhất Việt Nam
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
