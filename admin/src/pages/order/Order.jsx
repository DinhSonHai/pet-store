import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import {
  ConfirmOrders,
  PickUpOrders,
  PackingOrders,
  PackedOrders,
  TransportingOrders,
} from '../../components';
const { TabPane } = Tabs;
const Order = () => {
  const [tabChange, setTabChange] = useState('confirm');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='type__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} defaultActiveKey={tabChange} type='card'>
          <TabPane tab={<span>Chờ xác nhận</span>} key='confirm'>
            <ConfirmOrders tabChange={tabChange} />
          </TabPane>
          <TabPane tab={<span>Chờ lấy hàng</span>} key='pickup'>
            <PickUpOrders tabChange={tabChange} />
          </TabPane>
          <TabPane tab={<span>Chờ đóng gói</span>} key='packing'>
            <PackingOrders tabChange={tabChange} />
          </TabPane>
          <TabPane tab={<span>Đóng gói xong</span>} key='packed'>
            <PackedOrders tabChange={tabChange} />
          </TabPane>
          <TabPane tab={<span>Đang vận chuyển</span>} key='transporting'>
            <TransportingOrders tabChange={tabChange} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};
export default Order;
