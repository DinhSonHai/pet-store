/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Rate, Button, Tabs, Breadcrumb } from 'antd';
import { MenuOutlined, StarOutlined } from '@ant-design/icons';
import { AddToCartDetail } from '../../assets/icons';
import { FavoriteAction } from '../../components';
import DetailDescription from './description';
import DetailReview from './review';
import DetailComments from './comments';
import { getProductById } from '../../redux/actions/products';
import { addItem } from '../../utils/cart';
import { notifyActions } from '../../utils/notify';
import { Loader } from '../../components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import './styles.scss';

const { TabPane } = Tabs;
const ProductDetails = ({
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
        notifyActions('success', 'Đã thêm sản phẩm vào giỏ hàng');
      }
    }
  };
  return (
    <section className='product-details'>
      <div className='container'>
        <Breadcrumb style={{ marginBottom: '2rem' }}>
          <Breadcrumb.Item>
            <Link className='product-type__header-title' to='/'>
              Trang chủ
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className='product-type__header-title'>
              {match.params.productName}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='product-details__content'>
          {loading || !data ? (
            <Loader className={'loader-inside'} />
          ) : (
            <Fragment>
              <div className='product-details__wrap'>
                <Row gutter={[16, 0]}>
                  <Col
                    className='product-details__images'
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                  >
                    <ImageGallery
                      thumbnailPosition='left'
                      showPlayButton={false}
                      items={data.images.map((item) => ({
                        original: item,
                        thumbnail: item,
                      }))}
                    />
                  </Col>
                  <Col
                    className='product-details__card-info'
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                  >
                    <Card
                      actions={[
                        <FavoriteAction
                          isAuthenticated={isAuthenticated}
                          data={data}
                          user={user}
                          favoriteState={
                            user
                              ? user.favoriteProducts.some(
                                  (p) => p.toString() === data._id.toString()
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
                        <span style={{ fontSize: '1.2rem', color: '#106eea' }}>
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

ProductDetails.propTypes = {
  getProductById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProductById })(ProductDetails);
