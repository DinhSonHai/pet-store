import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadAdminStatisticalData, loadEmployeeStatisticalData } from '../../redux/actions/statistical';

import { Skeleton, Switch, Card, Avatar, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './styles.scss';
const { Meta } = Card;

const DashBoard = ({
  statistical: { todayRevenues, todayBills, todaySales, newestOrders },
  auth: { user },
  loadAdminStatisticalData,
  loadEmployeeStatisticalData,
  match,
  location,
  history,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (user) {
        if (user.role === 0) {
          await loadAdminStatisticalData();
        }
        else {
          await loadEmployeeStatisticalData();
        }
      }
      // await getSearchProductsList();
      setLoading(false);
    }
    getData();
  }, [user]);

  return (
    <section className='category'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Trang chủ quản trị</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='category__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        {/* Admin Content */}
        { user && user.role === 0 && todayRevenues && todayBills && todaySales && newestOrders && (<div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/todayRevenues.png?alt=media&token=76b05248-8c61-4808-b1a7-cc3c4447e213" />
                    }
                    title={todayRevenues.todayRevenues.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) || "0đ"}
                    description="Tổng số doanh thu ngày hôm nay"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/todayBills.png?alt=media&token=4100056f-62f2-4966-9dc9-3d2f25b4b829" />
                    }
                    title={todayBills.billCount || "0"}
                    description="Tổng hóa đơn hoàn tất hôm nay"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/todaySales.png?alt=media&token=7b84b030-d813-456c-adbe-14bb14c65c55" />
                    }
                    title={todaySales.productCount || "0"}
                    description="Tổng sản phẩm bán ra hôm nay"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/newestOrders.png?alt=media&token=4442630f-e191-4705-ade9-53f1b79fa212" />
                    }
                    title={newestOrders.orderCount || "0"}
                    description="Tổng số đơn hàng mới đặt hôm nay"
                  />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>)}
        {/* End admin content */}

        {/* Employee content */}
        { user && user.role === 1 && (<div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ marginTop: 16 }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        </div>)}
        {/* End employee content */}
      </div>
    </section>
  );
};

DashBoard.propTypes = {
  
};

const mapStateToProps = (state) => ({
  statistical: state.statistical,
  auth: state.auth
});

export default connect(mapStateToProps, {   loadAdminStatisticalData, loadEmployeeStatisticalData })(DashBoard);
