/* eslint-disable import/no-anonymous-default-export */
import { Row, Col, Card } from 'antd';
import { Payment, Call, Shipped, Reputation } from '../../../icons';
import './styles.scss';
export default () => {
  return (
    <section className='vision'>
      <div className='vision__wrap container'>
        <Row gutter={[26, 26]}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card bordered={false}>
              <p style={{ height: '3rem' }}>
                <Payment />
              </p>
              <p className='vision__title'>THANH TOÁN ONLINE</p>
              <p className='vision__desc'>
                Thanh toán nhanh chóng, tiết kiệm thời gian, nhận ưu đãi hấp dẫn
                !
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card bordered={false}>
              <p style={{ height: '3rem' }}>
                <Call />
              </p>
              <p className='vision__title'>TƯ VẤN 24/24</p>
              <p className='vision__desc'>
                Nếu quý khách hàng có bất kì vấn đề nào cần tư vấn, xin hãy liên
                hệ cho chúng tôi !
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card bordered={false}>
              <p style={{ height: '3rem' }}>
                <Shipped />
              </p>
              <p className='vision__title'>GIAO HÀNG TOÀN QUỐC</p>
              <p className='vision__desc'>
                Petstore.vn giao hàng trên phạm vi toàn quốc. Quý khách an tâm
                mua sắm.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Card bordered={false}>
              <p style={{ height: '3rem' }}>
                <Reputation />
              </p>
              <p className='vision__title'>UY TÍN NÈ</p>
              <p className='vision__desc'>
                Petstore.vn cung cấp những sản phẩm chất lượng, đáng tin cậy,
                bảo đảm hài lòng.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};
