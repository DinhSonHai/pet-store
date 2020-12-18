import React from 'react';
import { Card, Form, Input, notification } from 'antd';
import { GET_AUTH_INFO } from '../../../redux/types';
import store from '../../../store';
import equal from 'fast-deep-equal';
const CheckoutFormAuth = ({ cartState, history, user }) => {
  const onFinish = (values) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!equal(cart, cartState)) {
      return history.push('/cart');
    }
    if (user && user.address.length <= 0) {
      return notification.open({
        message: 'Lỗi!',
        description: 'Vui lòng chọn địa chỉ giao hàng!',
      });
    }
    if (user && !user.phoneNumber) {
      return notification.open({
        message: 'Lỗi!',
        description: 'Vui lòng cung cấp số điện thoại!',
      });
    }
    const { note } = values;
    const payload = {
      note,
      cart: cartState.map((item) => ({ _id: item._id, amount: item.amount })),
    };
    store.dispatch({
      type: GET_AUTH_INFO,
      payload: payload,
    });
    return history.push('/order');
  };
  return (
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
        <Form.Item initialValue={''} name='note' label='Ghi chú'>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  );
};
export default CheckoutFormAuth;
