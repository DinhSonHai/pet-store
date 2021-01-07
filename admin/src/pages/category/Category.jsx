import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { CategoryList, CategoryRemoved } from '../../components';
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const Category = () => {
  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='category'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='category__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} defaultActiveKey={tabChange} type='card'>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Danh mục
              </span>
            }
            key='list'
          >
            <CategoryList tabChange={tabChange} />
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
            <CategoryRemoved tabChange={tabChange} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
export default Category;
