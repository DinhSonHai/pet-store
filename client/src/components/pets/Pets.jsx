import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getAllProducts } from '../../redux/actions/products';
import { connect } from 'react-redux';

import { Layout, Row, Col, Card, Menu, Dropdown, Button } from 'antd';
import {
  HeartOutlined,
  StarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { AddToCart } from '../../icons';
import { Link } from 'react-router-dom';
import './styles.css';
const { Content } = Layout;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key='1' icon={<StarOutlined />}>
      Thứ tự theo: điểm đánh giá
    </Menu.Item>
    <Menu.Item key='2' icon={<HeartOutlined />}>
      Thứ tự theo: mức độ yêu thích
    </Menu.Item>
    <Menu.Item key='3' icon={<CaretUpOutlined />}>
      Thứ tự theo: giá thấp đến cao
    </Menu.Item>
    <Menu.Item key='4' icon={<CaretDownOutlined />}>
      Thứ tự theo: giá cao đến thấp
    </Menu.Item>
  </Menu>
);
const Pets = ({ products: { products, loading }, getAllProducts }) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  const addItem = (item) => {
    let count = document.getElementById('cart__count');
    let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cartCopy.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      existingItem.amount += 1;
    } else {
      item.amount = 1;
      let { _id, amount, productName, images, price } = item;
      cartCopy.push({ _id, amount, productName, image: images[0], price });
    }
    localStorage.setItem('cart', JSON.stringify(cartCopy));
    count.textContent = cartCopy.length;
  };
  return (
    <Content className='pets'>
      <section className='container'>
        <div className='pets__header'>
          <h1 className='pets__header-title'>Pets</h1>
          <div className='pets__header-filter'>
            <Dropdown overlay={menu}>
              <Button>
                Mới nhất <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className='pets-list'>
          <Row gutter={[16, 16]}>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              products.map((product) => (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Link to={`/product/${product._id}`}>
                        <img
                          width='100%'
                          height='100%'
                          alt='example'
                          src={product.images[0]}
                        />
                      </Link>
                    }
                  >
                    <Link to={`/product/${product._id}`}>
                      <Meta title={product.productName} />
                      <p className='pets__price'>
                        {parseInt(product.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </Link>
                    <Button
                      onClick={() => addItem(product)}
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
      </section>
    </Content>
  );
};

Pets.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getAllProducts })(Pets);
