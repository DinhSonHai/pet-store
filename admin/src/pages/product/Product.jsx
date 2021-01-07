import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { ProductList, ProductRemoved, ProductAddForm } from '../../components';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;
const Product = () => {
  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='type__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} defaultActiveKey={tabChange} type='card'>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Sản phẩm
              </span>
            }
            key='list'
          >
            <ProductList tabChange={tabChange} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DeleteOutlined />
                Danh sách ẩn
              </span>
            }
            key='removed'
          >
            <ProductRemoved tabChange={tabChange} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <PlusOutlined />
                Thêm
              </span>
            }
            key='actions'
          >
            <ProductAddForm tabChange={tabChange} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
export default Product;
