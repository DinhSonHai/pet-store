/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Rate, Button, notification } from 'antd';
import { Carousel } from 'react-responsive-carousel';
import { AddToCartDetail, Heart, HeartFill } from '../../icons';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

import { getProductById } from '../../redux/actions/products';
import { UpdateFavorite } from '../../redux/actions/auth';
import { addItem } from '../../utils/cart';
import { Loader } from '../../components';
import { connect } from 'react-redux';

const PetDetails = ({
  getProductById,
  UpdateFavorite,
  match,
  data,
  auth: { user, isAuthenticated },
}) => {
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
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
  const handleFavorite = async (productId) => {
    if (!isAuthenticated) {
      return notification.open({
        message: 'Lỗi!',
        description: 'Bạn cần đăng nhập để thực hiện thao tác này!',
      });
    }
    if (!productId) {
      return;
    }
    setIsProcessing(true);
    await UpdateFavorite(productId);
    setIsProcessing(false);
  };
  return (
    <section className='pet-details'>
      <div className='container'>
        <h1 className='pet-details__title'>Chi tiết</h1>
        <div className='pet-details__content'>
          {loading || !data ? (
            <Loader />
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
                        <Button
                          disabled={isProcessing}
                          loading={isProcessing}
                          type='text'
                          icon={
                            user && user.favoriteProducts.includes(data._id) ? (
                              <HeartFill />
                            ) : (
                              <Heart />
                            )
                          }
                          onClick={() => handleFavorite(data._id)}
                        />,
                        <Button
                          type='text'
                          icon={<AddToCartDetail />}
                          onClick={() => addItem(data)}
                        />,
                      ]}
                      title={data.productName}
                      bordered={false}
                    >
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
  UpdateFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProductById, UpdateFavorite })(
  PetDetails
);
