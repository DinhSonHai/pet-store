/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Button } from 'antd';
import store from '../../store.js';
import { LOGOUT } from '../../redux/types';
export default ({ history }) => {
  return (
    <section className='sign-out site-layout-background'>
      <h1 className='sign-out__title'>Bạn có chắc là muốn đăng xuất chứ?</h1>
      <Button
        onClick={() => {
          store.dispatch({ type: LOGOUT });
          return history.push('/signin');
        }}
        type='primary'
      >
        Đăng xuất
      </Button>
      <Button
        type='link'
        onClick={() => history.push('/')}
        style={{ margin: '0 1rem' }}
      >
        Quay lại
      </Button>
    </section>
  );
};
