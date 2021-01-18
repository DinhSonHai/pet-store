/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Card } from 'antd';
import {
  UserOutlined,
  ContainerOutlined,
  ShopOutlined,
  HeartOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles.scss';
export default ({ tab }) => {
  const styleState = { backgroundColor: '#f0f0f0', color: '#106eea' };

  return (
    <Card bordered={false} className='profile__side--wrap'>
      <span>
        <Link style={tab === 'info' ? styleState : {}} to='/profile/?tab=info'>
          <UserOutlined /> Thông tin tài khoản
        </Link>
      </span>
      <span>
        {' '}
        <Link
          style={tab === 'orders' ? styleState : {}}
          to='/profile/?tab=orders'
        >
          <ContainerOutlined /> Quản lý đơn hàng
        </Link>
      </span>
      <span>
        <Link
          style={tab === 'address' ? styleState : {}}
          to='/profile/?tab=address'
        >
          <ShopOutlined /> Sổ địa chỉ
        </Link>
      </span>
      <span>
        <Link
          style={tab === 'wishlist' ? styleState : {}}
          to='/profile/?tab=wishlist'
        >
          <HeartOutlined /> Sản phẩm ưa thích
        </Link>
      </span>
      <span>
        <Link
          style={tab === 'purchased' ? styleState : {}}
          to='/profile/?tab=purchased'
        >
          <DollarOutlined /> Sản phẩm đã mua
        </Link>
      </span>
    </Card>
  );
};
