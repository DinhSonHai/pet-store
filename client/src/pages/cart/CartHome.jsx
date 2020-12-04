/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from 'react';
import { Layout, Col, Row, Card, InputNumber, Button } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';

const { Content } = Layout;

export default function () {
  const [data, setData] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total_value = cart.reduce((a, b) => a + b.price * b.amount, 0);
    setTotalCart(total_value);
    setData(cart);
  }, [updateCart]);
  const setAmount = (_id, value) => {
    if (!value || isNaN(value) || !Number.isInteger(value)) {
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    let updatedCart = cart.map((item) => {
      return item._id === _id ? { ...item, amount: value } : item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setUpdateCart(!updateCart);
  };

  const removeItem = (_id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let count = document.getElementById('cart__count');
    let updatedCart = cart.filter((item) => {
      return item._id !== _id;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setUpdateCart(!updateCart);
    count.textContent = updatedCart.length;
  };

  return (
    <section className='cart'>
      <Content className='cart'>
        <div className='container'>
          {data.length === 0 ? (
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
                <Col className='cart__wrap' xs={24} lg={16}>
                  {data.map((item) => (
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
                </Col>
                <Col xs={24} lg={8}>
                  <Card
                    bordered={false}
                    title='Tổng đơn hàng'
                    className='cart__overall'
                  >
                    <div className='cart__total'>
                      Tổng tiền:{' '}
                      <span id='cart__total'>
                        {parseInt(totalCart).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                    </div>
                    <Link to='/checkout'>
                      <Button
                        style={{ width: '100%' }}
                        className='cart__checkout'
                        type='primary'
                      >
                        Thanh toán
                      </Button>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Fragment>
          )}
        </div>
      </Content>
    </section>
  );
}
