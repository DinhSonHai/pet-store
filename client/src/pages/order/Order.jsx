/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Col, Row, Card, Button, Radio } from 'antd';
import equal from 'fast-deep-equal';
import { connect } from 'react-redux';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { orderProducts, orderProductsAuth } from '../../redux/actions/order';
import PropTypes from 'prop-types';
import store from '../../store';
import {
  REMOVE_CART,
  UPDATE_GUEST_INFO,
  UPDATE_AUTH_INFO,
  CLEAR_CHECKOUT_INFO,
} from '../../redux/types';
import './styles.scss';

const style = {
  display: 'block',
  lineHeight: '30px',
};
const Order = ({
  cartState,
  history,
  auth: { isAuthenticated },
  checkout: { guestState, authState },
  orderProducts,
  orderProductsAuth,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [deliveryState, SetDeliveryState] = useState({
    value: 0,
    price: 35000,
  });
  const [paymentState, SetPaymentState] = useState(0);
  useEffect(() => {
    window.addEventListener('storage', () => {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (!equal(cart, cartState)) {
        return store.dispatch({ type: REMOVE_CART });
      }
    });
    if (cartState && cartState.length > 0) {
      let total_value = cartState.reduce((a, b) => a + b.price * b.amount, 0);
      setTotalMoney(total_value + deliveryState.price);
      if (isAuthenticated) {
        store.dispatch({
          type: UPDATE_AUTH_INFO,
          payload: {
            deliveryState: deliveryState.value,
            paymentState,
            totalMoney: total_value + deliveryState.price,
          },
        });
        return;
      }
      store.dispatch({
        type: UPDATE_GUEST_INFO,
        payload: {
          deliveryState: deliveryState.value,
          paymentState,
          totalMoney: total_value + deliveryState.price,
        },
      });
    }
  }, [cartState, deliveryState]);
  const onChangeDelivery = (e) => {
    SetDeliveryState({
      ...deliveryState,
      value: e.target.value,
      price: e.target.value === 0 ? 35000 : 55000,
    });
  };
  const onChangePayment = (e) => {
    SetPaymentState(e.target.value);
  };
  const onFinish = async () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!equal(cart, cartState)) {
      return history.push('/cart');
    }
    setIsProcessing(true);
    let res;
    if (isAuthenticated) {
      res = await orderProductsAuth(authState);
    } else {
      res = await orderProducts(guestState);
    }
    setIsProcessing(false);
    if (res) {
      store.dispatch({
        type: REMOVE_CART,
      });
      store.dispatch({
        type: CLEAR_CHECKOUT_INFO,
      });
      localStorage.removeItem('cart');
    }
  };

  return (
    <section className='order'>
      <div className='order__wrap container'>
        <Row gutter={[16, 16]}>
          <Col className='order__form' xs={24} sm={24} md={24} lg={15}>
            <Card
              style={{ marginBottom: '1rem' }}
              title='Chọn hình thức giao hàng'
            >
              <Radio.Group
                onChange={onChangeDelivery}
                value={deliveryState.value}
              >
                <Radio style={style} value={0}>
                  {`Giao hàng tiêu chuẩn  :  ${parseInt(35000).toLocaleString(
                    'vi-VN',
                    {
                      style: 'currency',
                      currency: 'VND',
                    }
                  )}`}
                </Radio>
                <Radio style={style} value={1}>
                  {`Giao hàng nhanh  :  ${parseInt(55000).toLocaleString(
                    'vi-VN',
                    {
                      style: 'currency',
                      currency: 'VND',
                    }
                  )}`}
                </Radio>
              </Radio.Group>
            </Card>
            <Card title='Chọn hình thức thanh toán'>
              <Radio.Group onChange={onChangePayment} value={paymentState}>
                <Radio style={style} value={0}>
                  Thanh toán tiền mặt khi nhận hàng (COD)
                </Radio>
              </Radio.Group>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} className='order__order'>
            <Card
              extra={
                <div className='checkout__update-cart'>
                  <CaretLeftOutlined />
                  <Link to='/checkout'>Sửa địa chỉ</Link>
                </div>
              }
              title='Đơn hàng'
            >
              <div className='order__products'>
                {cartState.map((item) => (
                  <div key={item._id} className='order__products--content'>
                    <img
                      width='50'
                      height='50'
                      style={{ objectFit: 'cover' }}
                      src={item.image}
                      alt='Cart'
                    />

                    <div className='order__products--info'>
                      <p className='order__products--name'>
                        {item.productName}
                      </p>
                      <p className='order__products--price'>
                        {parseInt(item.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                        <span
                          className='order__products--amount'
                          style={{ margin: '0 1rem' }}
                        >
                          {'x' + item.amount}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className='order__fee'>
                <span>Phí vận chuyển: </span>
                <span>
                  {parseInt(deliveryState.price).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>
              <p className='order__total'>
                <span>Tổng tiền: </span>
                <span id='order__total'>
                  {parseInt(totalMoney).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>
              <Button
                loading={isProcessing}
                onClick={onFinish}
                block
                type='primary'
              >
                Đặt hàng
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  cartState: state.cart.cartState,
  auth: state.auth,
  checkout: state.checkout,
});
Order.propTypes = {
  orderProducts: PropTypes.func.isRequired,
  orderProductsAuth: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { orderProducts, orderProductsAuth })(
  Order
);
