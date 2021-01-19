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
  Tooltip,
} from 'antd';
import {
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

const PetsList = ({
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
        `/pets/${match.params.type}/list/${match.params.id}/?sort=${filter}&page=${_page}`
      );
    }
    return history.push(
      `/pets/${match.params.type}/list/${match.params.id}/?page=${_page}`
    );
  };
  const menu = (
    <Menu>
      <Menu.Item key='3' icon={<CaretUpOutlined />}>
        <Link
          to={`/pets/${match.params.type}/list/${match.params.id}/?sort=asc`}
        >
          {' '}
          Thứ tự theo: giá thấp đến cao
        </Link>
      </Menu.Item>
      <Menu.Item key='4' icon={<CaretDownOutlined />}>
        <Link
          to={`/pets/${match.params.type}/list/${match.params.id}/?sort=desc`}
        >
          {' '}
          Thứ tự theo: giá cao đến thấp
        </Link>
      </Menu.Item>
    </Menu>
  );
  const handleAddToCart = (item) => {
    if (item) {
      const check = addItem(item);
      if (check) {
        return message.success('Đã thêm sản phẩm vào giỏ hàng');
      }
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
                {match.params.type === 'dog'
                  ? 'Chó cảnh'
                  : match.params.type === 'cat'
                  ? 'Mèo cảnh'
                  : match.params.type === 'food'
                  ? 'Thức ăn'
                  : match.params.type === 'accessories' && 'Phụ kiện'}
              </Link>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>
              <span className='pets__header-title'>Chó Alaska</span>
            </Breadcrumb.Item> */}
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
                  <Card hoverable>
                    <Link
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                      to={`/pet/${product._id}`}
                    >
                      <div
                        style={{ textAlign: 'center', marginBottom: '1.5rem' }}
                      >
                        <img
                          width='100%'
                          height='100%'
                          alt='example'
                          src={product.images[0]}
                        />
                      </div>
                      <div>
                        <p className='pets__name'>
                          <Tooltip
                            placement='topLeft'
                            title={product.productName}
                          >
                            {product.productName}
                          </Tooltip>
                        </p>
                        <p className='pets__price'>
                          {parseInt(product.price).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </p>
                      </div>
                    </Link>
                  </Card>
                  <Button
                    disabled={product.status ? false : true}
                    onClick={() => handleAddToCart(product)}
                    className='addToCart'
                    icon={<AddToCart />}
                    type='primary'
                  />
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

PetsList.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.products,
});

export default connect(mapStateToProps, { getProductsByType })(PetsList);
