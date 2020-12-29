import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Card,
  Menu,
  Dropdown,
  Button,
  Breadcrumb,
  message,
  Pagination,
} from 'antd';
import {
  HeartOutlined,
  StarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { AddToCart } from '../../icons';
import { addItem } from '../../utils/cart';
import { Loader } from '../../components';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import './styles.scss';
const { Meta } = Card;

const Pets = ({
  data: { products, total },
  getProductsByType,
  match,
  location,
  history,
}) => {
  let filter = queryString.parse(location.search).sort;
  let page = queryString.parse(location.search).page;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getProductsByType(match.params.id, filter, page);
      setLoading(false);
    }
    getData();
  }, [getProductsByType, match.params.id, filter, page]);
  const handlePagination = async (_page) => {
    if (filter) {
      return history.push(
        `/pets/types/${match.params.id}/?sort=${filter}&page=${_page}`
      );
    }
    return history.push(`/pets/types/${match.params.id}/?page=${_page}`);
  };
  const menu = (
    <Menu>
      <Menu.Item key='1' icon={<StarOutlined />}>
        Thứ tự theo: điểm đánh giá
      </Menu.Item>
      <Menu.Item key='2' icon={<HeartOutlined />}>
        Thứ tự theo: mức độ yêu thích
      </Menu.Item>
      <Menu.Item key='3' icon={<CaretUpOutlined />}>
        <Link to={`/pets/types/${match.params.id}/?sort=asc`}>
          {' '}
          Thứ tự theo: giá thấp đến cao
        </Link>
      </Menu.Item>
      <Menu.Item key='4' icon={<CaretDownOutlined />}>
        <Link to={`/pets/types/${match.params.id}/?sort=desc`}>
          {' '}
          Thứ tự theo: giá cao đến thấp
        </Link>
      </Menu.Item>
    </Menu>
  );
  const handleAddToCart = (item) => {
    if (item) {
      addItem(item);
      return message.success('Đã thêm sản phẩm vào giỏ hàng');
    }
  };
  return (
    <section className='pets'>
      <div className='container'>
        <div className='pets__header'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link className='pets__header-title' to='/'>
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link className='pets__header-title' to='/'>
                Chó cảnh
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className='pets__header-title'>Chó Alaska</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='pets__header-filter'>
            <Dropdown disabled={loading} overlay={menu}>
              <Button>
                Mới nhất <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className='pets-list'>
          <Row gutter={[16, 16]}>
            {loading || !products ? (
              <Loader className={'loader'} />
            ) : (
              products.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    bordered={false}
                    cover={
                      <Link to={`/pet/${product._id}`}>
                        <img
                          width='100%'
                          height='100%'
                          alt='example'
                          src={product.images[0]}
                        />
                      </Link>
                    }
                  >
                    <Link to={`/pet/${product._id}`}>
                      <Meta title={product.productName} />
                      <p className='pets__price'>
                        {parseInt(product.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </Link>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className='addToCart'
                      icon={<AddToCart />}
                      type='primary'
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
        <Pagination
          onChange={handlePagination}
          disabled={loading}
          current={!page ? 1 : parseInt(page)}
          responsive={true}
          pageSize={12}
          total={total}
          showSizeChanger={false}
          style={{ textAlign: 'center', margin: '3rem 0 1rem 0' }}
        />
      </div>
    </section>
  );
};

Pets.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getProductsByType })(Pets);
