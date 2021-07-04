import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import BlogList from './list';
import BlogAddForm from './add_form';
import {
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;
const Blog = () => {
  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý bài viết</Breadcrumb.Item>
        <Breadcrumb.Item>Bài viết</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='type__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} activeKey={tabChange} type='card'>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Danh sách bài viết
              </span>
            }
            key='list'
          >
            <BlogList tabChange={tabChange} setTabChange={setTabChange}/>
          </TabPane>
          <TabPane
            tab={
              <span>
                <PlusOutlined />
                Thêm bài viết
              </span>
            }
            key='actions'
          >
            <BlogAddForm tabChange={tabChange} setTabChange={setTabChange}/>
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
export default Blog;
