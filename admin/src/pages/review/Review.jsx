import { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { ReviewsProducts } from '../../components';

const { TabPane } = Tabs;

const Review = () => {
  const [tabChange, setTabChange] = useState('reviews-products');
  const onTabChange = (key) => {
    setTabChange(key);
  };

  return (
    <section className='review'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Quản lý bình luận</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='review__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <Tabs onTabClick={onTabChange} defaultActiveKey={tabChange} type='card'>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                Chờ xét duyệt đánh giá
              </span>
            }
            key='reviews-products'
          >
            <ReviewsProducts tabChange={tabChange} />
          </TabPane>
        </Tabs>
      </div>
    </section>
  );
};

export default Review;
