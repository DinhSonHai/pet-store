/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Card } from 'antd';
import {
  UserOutlined,
  ContainerOutlined,
  ShopOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles.scss';
export default ({ checkPage }) => {
  const styleState = { backgroundColor: '#f0f0f0', color: '#106eea' };

  return (
    <Card bordered={false} className='profile__side--wrap'>
      <span>
        <Link style={checkPage === '/profile' ? styleState : {}} to='/profile'>
          <UserOutlined /> Thông tin tài khoản
        </Link>
      </span>
      <span>
        {' '}
        <Link
          style={checkPage === '/profile/orders' ? styleState : {}}
          to='/profile/orders'
        >
          <ContainerOutlined /> Quản lý đơn hàng
        </Link>
      </span>
      <span>
        <Link
          style={checkPage === '/profile/address' ? styleState : {}}
          to='/profile/address'
        >
          <ShopOutlined /> Sổ địa chỉ
        </Link>
      </span>
      <span>
        <Link
          style={checkPage === '/profile/wishlist' ? styleState : {}}
          to='/profile/wishlist'
        >
          <HeartOutlined /> Sản phẩm ưa thích
        </Link>
      </span>
    </Card>
  );
};
