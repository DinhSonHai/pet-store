import React from 'react';
import { Card, Form, Input } from 'antd';
import { notifyActions } from '../../../utils/notify';
import { GET_AUTH_INFO } from '../../../redux/types';
import store from '../../../app/store';

const CheckoutFormAuth = ({ cartState, history, user }) => {
  const onFinish = (values) => {
    if (user && user.address.length <= 0) {
      return notifyActions('error', 'Vui lòng chọn địa chỉ giao hàng!');
    }
    if (user && !user.phoneNumber) {
      return notifyActions('error', 'Vui lòng cung cấp số điện thoại!');
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
    <Card bordered={false}>
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
