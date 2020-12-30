import React from 'react';
import { Breadcrumb } from 'antd';

const Category = () => {
  return (
    <section className='category'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='category__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        Bill is a cat.
      </div>
    </section>
  );
};
export default Category;
