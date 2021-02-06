/* eslint-disable import/no-anonymous-default-export */
import { Row, Col, Card } from 'antd';
import { PetHealthy, PetWash, PetCut } from '../../../icons';
import './styles.scss';
export default () => {
  return (
    <section className='services'>
      <div className='services__wrap container'>
        <p className='services__heading'>Services</p>
        <h1 className='services__title'>
          Về <span>dịch vụ</span>
        </h1>
        <h4 className='services__desc-head'>
          Tại PetShop, chúng tôi cung cấp những dịch vụ giúp thú cưng của bạn
          luôn trong tình trạng khỏe mạnh, sạch sẽ.
        </h4>
        <div className='services__content'>
          <Row
            gutter={[
              { xs: 16, sm: 16, md: 16, lg: 26 },
              { xs: 16, sm: 16, md: 16, lg: 26 },
            ]}
          >
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card hoverable={true}>
                <p className='services__content--icon'>
                  <PetHealthy />
                </p>
                <p className='services__content--title'>Sức khỏe</p>
                <p className='services__content--desc'>
                  Để đảm bảo sức khỏe cho người và vật nuôi, thú cưng cần được
                  tiêm phòng và tái chủng định kì theo hướng dẫn của bác sĩ.
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card hoverable={true}>
                <p className='services__content--icon'>
                  <PetWash />
                </p>
                <p className='services__content--title'>Vệ sinh</p>
                <p className='services__content--desc'>
                  Với quy trình tắm khử mùi hôi, dưỡng dầu xả mềm mượt, vệ sinh
                  tai, sấy và chải lông, cắt mài móng, gỡ rối và chải lông rụng
                  của chúng tôi sẽ làm cho vật nuôi của các bạn sạch sẽ, thơm
                  tho hơn.
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8}>
              <Card hoverable={true}>
                <p className='services__content--icon'>
                  <PetCut />
                </p>
                <p className='services__content--title'>Cắt tỉa lông</p>
                <p className='services__content--desc'>
                  Với quy trình: chải lông, cắt tỉa lông, tạo kiểu theo yêu
                  cầu,nhổ lông tai, làm móng, tắm cho chó mèo, vệ sinh tai, sấy
                  lông, nhỏ thuốc trị rận, trị ghẻ nếu có chắc chắn các bạn sẽ
                  hài lòng.
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
