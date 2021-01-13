/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from 'react';
import { Col, Row, Card, InputNumber, Button } from 'antd';
import { removeItem, setAmount } from '../../utils/cart';
import equal from 'fast-deep-equal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../store';
import './styles.scss';

const CartHome = ({ cartState, history }) => {
  const [totalCart, setTotalCart] = useState(0);
  useEffect(() => {
    window.addEventListener('storage', () => {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (!equal(cart, cartState)) {
        return window.location.reload(false);
      }
    });
    let total_value = cartState.reduce((a, b) => a + b.price * b.amount, 0);
    setTotalCart(total_value);
  }, [cartState]);
  return (
    <section className='cart'>
      <div className='container'>
        {!cartState || cartState.length === 0 ? (
          <div className='cart__empty'>
            <h1 className='cart__title'>Giỏ hàng của bạn trống!</h1>
            <Link to='/'>
              <Button className='cart__checkout' type='primary'>
                Tiếp tục mua hàng
              </Button>
            </Link>
          </div>
        ) : (
          <Fragment>
            <h1 className='cart__title'>Giỏ hàng của bạn</h1>
            <Row gutter={[16, 16]}>
              <Col className='cart__wrap' xs={24} sm={24} md={24} lg={16}>
                <Card>
                  <div className='cart__items'>
                    {cartState.map((item) => (
                      <div key={item._id} className='cart__content'>
                        <img
                          width='100'
                          height='100'
                          style={{ objectFit: 'cover' }}
                          src={item.image}
                          alt='Cart'
                          className='cart__product--img'
                        />

                        <div className='cart__product--info'>
                          <Link
                            className='cart__product--name'
                            to={`/pet/${item._id}`}
                          >
                            {item.productName}
                          </Link>
                          <p className='cart__product--price'>
                            {parseInt(item.price).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </p>
                          <InputNumber
                            onChange={(value) => {
                              setAmount(item._id, value);
                            }}
                            max={100}
                            min={1}
                            value={item.amount}
                          />
                          <Button
                            onClick={() => removeItem(item._id)}
                            style={{ color: 'red' }}
                            type='text'
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8}>
                <Card title='Tổng đơn hàng' className='cart__overall'>
                  <div className='cart__total'>
                    <span>Tổng tiền: </span>
                    <span id='cart__total'>
                      {parseInt(totalCart).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <Button
                    onClick={() => history.push('/checkout')}
                    block
                    className='cart__checkout'
                    type='primary'
                  >
                    Thanh toán
                  </Button>
                </Card>
              </Col>
            </Row>
          </Fragment>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cartState: state.cart.cartState,
});

export default connect(mapStateToProps, {})(CartHome);
