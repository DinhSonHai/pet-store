/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Button } from 'antd';
import store from '../../store.js';
import { LOGOUT, CLEAR_PROFILE } from '../../redux/types';
export default ({ history }) => {
  return (
    <section className='sign-out'>
      <h1 className='sign-out__title'>Bạn có chắc là muốn đăng xuất chứ?</h1>
      <Button
        onClick={() => {
          localStorage.removeItem('cart');
          store.dispatch({ type: LOGOUT });
          store.dispatch({ type: CLEAR_PROFILE });
          return history.push('/');
        }}
        type='primary'
      >
        Đăng xuất
      </Button>
    </section>
  );
};
