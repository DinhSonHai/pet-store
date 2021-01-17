/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Rate, Button, message, Tabs } from 'antd';
import { MenuOutlined, StarOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import { AddToCartDetail } from '../../icons';
import {
  FavoriteAction,
  DetailDescription,
  DetailReview,
  DetailComments,
} from '../../components';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.scss';

import { getProductById } from '../../redux/actions/products';
import { addItem } from '../../utils/cart';
import { Loader } from '../../components';
import { connect } from 'react-redux';
const { TabPane } = Tabs;
const PetDetails = ({
  getProductById,
  match,
  data,
  auth: { user, isAuthenticated },
}) => {
  const [loading, setLoading] = useState(false);
  const [tabChange, setTabChange] = useState('description');
  const onTabChange = (key) => {
    setTabChange(key);
  };
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
      const check = addItem(item);
      if (check) {
        message.success('Đã thêm sản phẩm vào giỏ hàng');
      }
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
            <Fragment>
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
                                ? user.favoriteProducts.some(
                                    (p) => p === data._id
                                  )
                                : null
                            }
                          />,
                          <Button
                            disabled={data.status ? false : true}
                            block
                            style={{ height: '100%' }}
                            type='text'
                            icon={<AddToCartDetail />}
                            onClick={() => handleAddToCart(data)}
                          />,
                        ]}
                      >
                        <p style={{ fontSize: '1.2rem' }}>{data.productName}</p>
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
                        <span className='ant-rate-text'>
                          {data.starRatings <= 0
                            ? 'Chưa có đánh giá nào'
                            : `${data.reviewsCount} đánh giá`}
                        </span>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </div>
              <Tabs
                onTabClick={onTabChange}
                defaultActiveKey={tabChange}
                type='card'
              >
                <TabPane
                  tab={
                    <span>
                      <MenuOutlined />
                      Mô tả
                    </span>
                  }
                  key='description'
                >
                  <DetailDescription
                    desc={data.description}
                    tabChange={tabChange}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <StarOutlined />
                      Đánh giá
                    </span>
                  }
                  key='review'
                >
                  <DetailReview id={data._id} tabChange={tabChange} />
                  <DetailComments id={data._id} tabChange={tabChange} />
                </TabPane>
              </Tabs>
            </Fragment>
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
