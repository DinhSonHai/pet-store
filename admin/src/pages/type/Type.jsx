import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { TypeList, TypeRemoved } from '../../components';
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const Type = () => {
  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Loại sản phẩm</Breadcrumb.Item>
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
                Loại sản phẩm
              </span>
            }
            key='list'
          >
            <TypeList tabChange={tabChange} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DeleteOutlined />
                Loại SP ẩn
              </span>
            }
            key='removed'
          >
            <TypeRemoved tabChange={tabChange} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
export default Type;
