import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import NotificationAddForm from './add_form';
import NotificationList from './list';
import {
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import useCheckRole from '../../hooks/useCheckRole';
import { ADMIN } from '../../constants';

const { TabPane } = Tabs;
const Notification = () => {
  const { role } = useCheckRole();

  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý notifications</Breadcrumb.Item>
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
                Danh sách
              </span>
            }
            key='list'
          >
            <NotificationList tabChange={tabChange} />
          </TabPane>
          {role === ADMIN && (
            <TabPane
              tab={
                <span>
                  <PlusOutlined />
                  Thêm
                </span>
              }
              key='actions'
            >
              <NotificationAddForm setTabChange={setTabChange} tabChange={tabChange} />
            </TabPane>
          )}
        </Tabs>
      </div>
    </section>
  );
};
export default Notification;
