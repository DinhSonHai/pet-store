import { useState, useEffect } from 'react';
import { getProvince, getWard, getTown } from '../../api/address';
import { Col, Row, Card, Button, Form, Input, Select } from 'antd';
import equal from 'fast-deep-equal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import { REMOVE_CART } from '../../redux/types';
import './styles.scss';
const { Option } = Select;
const Checkout = ({ cartState, history }) => {
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);
  const [town, setTown] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalCart, setTotalCart] = useState(0);

  const [countryState, setCountryState] = useState({
    p: '',
    w: '',
    t: '',
  });
  useEffect(() => {
    async function Get_Province() {
      const data = await getProvince();
      setProvince(data);
    }
    window.addEventListener('storage', () => {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (!equal(cart, cartState)) {
        return store.dispatch({ type: REMOVE_CART });
      }
    });
    if (cartState && cartState.length > 0) {
      let total_value = cartState.reduce((a, b) => a + b.price * b.amount, 0);
      setTotalCart(total_value);
      Get_Province();
    }
  }, [cartState]);
  const onChangeProvince = async (values) => {
    if (!values) {
      return;
    }
    let id = parseInt(values);
    setIsProcessing(true);
    const data = await getWard(id);
    setWard(data);
    setCountryState({ ...countryState, p: id });
    if (countryState.w || countryState.t) {
      setCountryState({ ...countryState, w: null, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeWard = async (values) => {
    if (!values) {
      return;
    }
    let id = parseInt(values);
    setIsProcessing(true);
    const data = await getTown(id);
    setTown(data);
    setCountryState({ ...countryState, w: id });
    if (countryState.t) {
      setCountryState({ ...countryState, t: null });
    }
    setIsProcessing(false);
  };
  const onChangeTown = (values) => {
    if (!values) {
      return;
    }
    let id = parseInt(values);
    setCountryState({ ...countryState, t: id });
  };
  const onFinish = (values) => {
    return history.push('signin');
  };

  return (
    <section className='checkout'>
      <div className='checkout__wrap container'>
        <div className='checkout__title'>
          <div>
            <span>Địa chỉ của bạn hoặc </span>
            <Link to='/signin'>Đăng nhập</Link>
          </div>
        </div>
        <Row gutter={[16, 16]}>
          <Col className='checkout__form' xs={24} sm={24} md={24} lg={15}>
            <Card>
              <Form
                layout='vertical'
                name='normal_checkout'
                initialValues={{
                  size: 'large',
                }}
                size='large'
                onFinish={onFinish}
              >
                <Form.Item
                  name='name'
                  label='Tên'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='phone'
                  label='Số điện thoại'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='email'
                  label='E-mail'
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không hợp lệ',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  initialValue={''}
                  name='provinceState'
                  label='Tỉnh/Thành Phố'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Tỉnh/Thành Phố!',
                    },
                  ]}
                >
                  <Select
                    loading={isProcessing}
                    disabled={isProcessing}
                    onChange={onChangeProvince}
                  >
                    <Option value={''}>Chọn Tỉnh/Thành Phố</Option>
                    {province.map((item) => (
                      <Option
                        key={parseInt(item.province_id)}
                        value={parseInt(item.province_id)}
                      >
                        {item.province_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  initialValue={''}
                  name='wardState'
                  label='Quận/Huyện'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Quận/Huyện!',
                    },
                  ]}
                >
                  <Select
                    loading={isProcessing}
                    disabled={isProcessing}
                    onChange={onChangeWard}
                  >
                    <Option value={''}>Chọn Quận/Huyện</Option>
                    {ward.map((item) => (
                      <Option
                        key={parseInt(item.district_id)}
                        value={parseInt(item.district_id)}
                      >
                        {item.district_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  initialValue={''}
                  name='townState'
                  label='Phường/Xã'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Phường/Xã!',
                    },
                  ]}
                >
                  <Select
                    onChange={onChangeTown}
                    loading={isProcessing}
                    disabled={isProcessing}
                  >
                    <Option value={''}>Chọn Phường/Xã</Option>
                    {town.map((item) => (
                      <Option
                        key={parseInt(item.ward_id)}
                        value={parseInt(item.ward_id)}
                      >
                        {item.ward_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  initialValue={''}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập địa chỉ!',
                    },
                  ]}
                  name='moreInfo'
                  label='Địa chỉ'
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item initialValue={''} name='note' label='Ghi chú'>
                  <Input.TextArea />
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} className='checkout__order'>
            <Card style={{ marginBottom: '1rem' }} title='Địa chỉ giao hàng'>
              <p>4874 Le Van Viet</p>
            </Card>
            <Card title='Đơn hàng'>
              <div className='checkout__products'>
                {cartState.map((item) => (
                  <div key={item._id} className='checkout__products--content'>
                    <img
                      width='50'
                      height='50'
                      style={{ objectFit: 'cover' }}
                      src={item.image}
                      alt='Cart'
                      className='cart__product--img'
                    />

                    <div className='checkout__products--info'>
                      <p className='checkout__products--name'>
                        {item.productName}
                      </p>
                      <p className='checkout__products--price'>
                        {parseInt(item.price).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                        <span
                          className='checkout__products--amount'
                          style={{ margin: '0 1rem' }}
                        >
                          {'x' + item.amount}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className='checkout__total'>
                Tổng tiền:{' '}
                <span id='checkout__total'>
                  {parseInt(totalCart).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </span>
              </p>
              <Button
                form={'normal_checkout'}
                block
                type='primary'
                htmlType='submit'
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
});
export default connect(mapStateToProps, {})(Checkout);
