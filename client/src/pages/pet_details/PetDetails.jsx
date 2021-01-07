/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Rate, Button, message } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { AddToCartDetail } from '../../icons';
import { FavoriteAction } from '../../components';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

import { getProductById } from '../../redux/actions/products';
import { addItem } from '../../utils/cart';
import { Loader } from '../../components';
import { connect } from 'react-redux';

const PetDetails = ({
  getProductById,
  match,
  data,
  auth: { user, isAuthenticated },
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getProductById(match.params.id);
      setLoading(false);
    }
    getData();
  }, [getProductById, match.params.id]);
  const handleAddToCart = (item) => {
    if (item) {
      addItem(item);
      return message.success('Đã thêm sản phẩm vào giỏ hàng');
    }
  };
  return (
    <section className='pet-details'>
      <div className='container'>
        <h1 className='pet-details__title'>Chi tiết</h1>
        <div className='pet-details__content'>
          {loading || !data ? (
            <Loader className={'loader'} />
          ) : (
            <div className='pet-details__wrap'>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12}>
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
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div className='pet-details__card-info'>
                    <Card
                      actions={[
                        <FavoriteAction
                          isAuthenticated={isAuthenticated}
                          data={data}
                          user={user}
                          favoriteState={
                            user
                              ? user.favoriteProducts.includes(data._id)
                              : null
                          }
                        />,
                        <Button
                          type='text'
                          icon={<AddToCartDetail />}
                          onClick={() => handleAddToCart(data)}
                        />,
                      ]}
                      title={data.productName}
                      bordered={false}
                    >
                      <p>
                        <b>Tình trạng: </b>
                        <span
                          style={{
                            color: data.status
                              ? 'var(--success-color)'
                              : 'var(--danger-color)',
                          }}
                        >
                          {data.status ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </p>
                      <p>
                        <b>Giá : </b>
                        <span style={{ fontSize: '1.2rem', color: '#106eea' }}>
                          {parseInt(data.price).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </p>
                      <Rate disabled defaultValue={data.starRatings} />
                    </Card>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

PetDetails.propTypes = {
  getProductById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProductById })(PetDetails);
