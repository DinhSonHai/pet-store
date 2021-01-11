import { useState, Fragment } from 'react';
import {
  EllipsisOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  OrderCanceled,
  OrderCompleted,
  OrderProcessing,
  ViewOrder,
} from '../../../components';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const Order = () => {
  const [tabChange, setTabChange] = useState('processing');
  const [viewDetail, setViewDetail] = useState(false);
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const onTabChange = (key) => {
    setTabChange(key);
  };
  return (
    <Fragment>
      <h3 className='profile__title'>Đơn hàng của tôi</h3>
      <div className='profile__main--order'>
        {viewDetail ? (
          <ViewOrder id={id} order={order} setViewDetail={setViewDetail} />
        ) : (
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
                setViewDetail={setViewDetail}
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
                setViewDetail={setViewDetail}
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
                setViewDetail={setViewDetail}
                tabChange={tabChange}
              />
            </TabPane>
          </Tabs>
        )}
      </div>
    </Fragment>
  );
};
export default Order;
