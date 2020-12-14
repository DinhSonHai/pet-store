/* eslint-disable import/no-anonymous-default-export */
import './styles.scss';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import Dog from '../../../img/dog.png';
import Cat from '../../../img/cat.png';
import Food from '../../../img/food.png';
import Accessories from '../../../img/accessories.png';

export default () => {
  return (
    <section className='category'>
      <div className='category__wrap container'>
        <p className='category__heading'>Products</p>
        <h1 className='category__title'>
          Về <span>sản phẩm</span>
        </h1>
        <h4 className='category__desc-head'>
          PetShop. cung cấp các mặt hàng như thức ăn cho thú cưng, cùng với các
          phụ kiện cần thiết.
        </h4>
        <div className='category__content'>
          <Row gutter={[28, 28]}>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/pet`}>
                <Card
                  bordered={false}
                  cover={
                    <img width='100%' height='100%' alt='example' src={Dog} />
                  }
                >
                  <p className='category__desc'>Choss cảnh</p>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/pet`}>
                {' '}
                <Card
                  bordered={false}
                  cover={
                    <img width='100%' height='100%' alt='example' src={Cat} />
                  }
                >
                  <p className='category__desc'>Hoàng thượng</p>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/pet`}>
                {' '}
                <Card
                  bordered={false}
                  cover={
                    <img width='100%' height='100%' alt='example' src={Food} />
                  }
                >
                  <p className='category__desc'>Thức ăn</p>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <Link to={`/pet`}>
                {' '}
                <Card
                  bordered={false}
                  cover={
                    <img
                      width='100%'
                      height='100%'
                      alt='example'
                      src={Accessories}
                    />
                  }
                >
                  <p className='category__desc'>Phụ kiện</p>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
