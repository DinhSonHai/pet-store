import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import DiscountOfferList from './list';
import OfferAddForm from './add_form';
import {
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import useCheckRole from '../../hooks/useCheckRole';
import { ADMIN } from '../../constants';

const { TabPane } = Tabs;
const DiscountOffer = () => {
  const { role } = useCheckRole();

  const [tabChange, setTabChange] = useState('list');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='type'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý khuyến mãi</Breadcrumb.Item>
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
                Danh sách khuyến mãi
              </span>
            }
            key='list'
          >
            <DiscountOfferList tabChange={tabChange} setTabChange={setTabChange} />
          </TabPane>
          {role === ADMIN && (
            <TabPane
              tab={
                <span>
                  <PlusOutlined />
                  Thêm khuyến mãi
                </span>
              }
              key='actions'
            >
              <OfferAddForm tabChange={tabChange} setTabChange={setTabChange} />
            </TabPane>
          )}
        </Tabs>
      </div>
    </section>
  );
};
export default DiscountOffer;
