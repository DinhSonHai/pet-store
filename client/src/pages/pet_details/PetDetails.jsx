/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Card, Button, Rate } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { AddToCart } from '../../icons';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

import { getProductById } from '../../redux/actions/products';
import { addItem } from '../../utils/cart';
import { connect } from 'react-redux';

const { Content } = Layout;

const PetDetails = ({ getProductById, match, data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data && data._id === match.params.id) {
      setLoading(false);
      return;
    }
    async function getData() {
      setLoading(true);
      await getProductById(match.params.id);
      setLoading(false);
    }
    getData();
  }, [getProductById, match.params.id]);

  return (
    <section className='pet-details'>
      <Content className='pet-details'>
        <div className='container'>
          <h1 className='pet-details__title'>Chi tiết</h1>
          <div className='pet-details__content'>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className='pet-details__wrap'>
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={12}>
                    <Carousel autoPlay>
                      {data.images.map((img, index) => (
                        <img
                          width='100%'
                          height='100%'
                          key={index}
                          src={img}
                          alt='No_Image'
                        />
                      ))}
                    </Carousel>
                  </Col>
                  <Col xs={24} lg={12}>
                    <div className='pet-details__card-info'>
                      <Card title={data.productName} bordered={false}>
                        <p>
                          <b>Nguồn gốc : </b>
                          {data.origin}
                        </p>
                        <p>
                          <b>Tuổi : </b>
                          {data.age}
                        </p>
                        <p>
                          <b>Cân nặng : </b>
                          {data.weight}
                        </p>
                        <p>
                          <b>Giới tính : </b>
                          {data.gender === 0 ? 'Đực' : 'Cái'}
                        </p>
                        <p>
                          <b>Màu sắc: </b>
                          {data.color}
                        </p>
                        <p>
                          <b>Giá : </b>
                          <span
                            style={{ fontSize: '1.2rem', color: '#106eea' }}
                          >
                            {parseInt(data.price).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                        </p>
                        <Rate disabled defaultValue={data.starRatings} />
                        <Button
                          onClick={() => addItem(data)}
                          className='addToCart'
                          icon={<AddToCart />}
                          type='primary'
                        />
                      </Card>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </Content>
    </section>
  );
};

PetDetails.propTypes = {
  getProductById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products.product,
});

export default connect(mapStateToProps, { getProductById })(PetDetails);
