import { useState, Fragment } from 'react';
import {
  EllipsisOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import OrderCanceled from './canceled';
import OrderCompleted from './completed';
import OrderProcessing from './processing';
import OrderView from './view';
import OrderTracking from './track';

import { Tabs } from 'antd';
const { TabPane } = Tabs;
const ProfileOrder = () => {
  const [tabChange, setTabChange] = useState('processing');
  const [view, setView] = useState('default');
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const onTabChange = (key) => {
    setTabChange(key);
  };
  return (
    <Fragment>
      <h3 className='profile__title'>Đơn hàng của tôi</h3>
      <div className='profile__main--order'>
        {view === 'detail' ? (
          <OrderView setId={setId} id={id} order={order} setView={setView} />
        ) : view === 'track' ? (
          <OrderTracking
            id={id}
            setId={setId}
            setOrder={setOrder}
            setView={setView}
          />
        ) : (
          view === 'default' && (
            <Tabs
              onTabClick={onTabChange}
              defaultActiveKey={tabChange}
              type='card'
            >
              <TabPane
                tab={
                  <span>
                    <EllipsisOutlined />
                    Đang xử lí
                  </span>
                }
                key='processing'
              >
                <OrderProcessing
                  setView={setView}
                  setId={setId}
                  setOrder={setOrder}
                  tabChange={tabChange}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CheckCircleOutlined />
                    Đã hoàn tất
                  </span>
                }
                key='completed'
              >
                <OrderCompleted
                  setId={setId}
                  setOrder={setOrder}
                  setView={setView}
                  tabChange={tabChange}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CloseCircleOutlined />
                    Đã hủy
                  </span>
                }
                key='canceled'
              >
                <OrderCanceled
                  setId={setId}
                  setOrder={setOrder}
                  setView={setView}
                  tabChange={tabChange}
                />
              </TabPane>
            </Tabs>
          )
        )}
      </div>
    </Fragment>
  );
};
export default ProfileOrder;
