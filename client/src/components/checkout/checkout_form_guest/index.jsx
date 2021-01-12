import React from 'react';
import { useState, useEffect } from 'react';
import { getProvince, getWard, getTown } from '../../../api/address';
import { Card, Form, Input, Select, notification } from 'antd';
import { GET_GUEST_INFO } from '../../../redux/types';
import store from '../../../store';
import equal from 'fast-deep-equal';
const { Option } = Select;
const CheckoutFormGuest = ({ cartState, history }) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [ward, setWard] = useState([]);
  const [town, setTown] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
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
    Get_Province();
  }, []);
  const onChangeProvince = async (values) => {
    if (!values) {
      return;
    }
    form.setFieldsValue({
      wardState: '',
      townState: '',
    });
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
    form.setFieldsValue({
      townState: '',
    });
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
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!equal(cart, cartState)) {
      return history.push('/cart');
    }
    const {
      name,
      phone,
      email,
      provinceState,
      wardState,
      townState,
      moreInfo,
      note,
    } = values;
    const { p, w, t } = countryState;
    if (!p || !w || !t) {
      return notification.open({
        message: 'Lỗi!',
        description: 'Vui lòng chọn Quận/Huyện hoặc Phường/Xã phù hợp!',
      });
    }
    const payload = {
      name,
      phone,
      email,
      provinceState: p ? provinceState : p,
      wardState: w ? wardState : w,
      townState: t ? townState : t,
      moreInfo,
      note,
      cart: cartState.map((item) => ({ _id: item._id, amount: item.amount })),
    };
    store.dispatch({
      type: GET_GUEST_INFO,
      payload,
    });
    return history.push('/order');
  };
  return (
    <Card>
      <Form
        form={form}
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
  );
};
export default CheckoutFormGuest;
