import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import { Skeleton, Switch, Card, Avatar, Col, Row } from 'antd';
import { loadOverallStatisticalData } from '../../redux/actions/statistical';
import { TodayRevenues, TodayBills, TodaySales, NewestOrders, NewestReviews, NewestComments, MonthlyRevenues, AnnualRevenues } from '../../icons';
const { Meta } = Card;

const Statistical = ({
  statistical: { todayRevenues, todayBills, todaySales, newestOrders, newestReviews, newestComments, monthlyRevenues, annualRevenues },
  auth: { user },
  loadOverallStatisticalData,
  match,
  location,
  history,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await loadOverallStatisticalData();
      setLoading(false);
    }
    getData();
  }, [user]);

  return (
    <section className="statistical">
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>
        <div
          className='category__wrap site-layout-background'
          style={{ padding: '1.5rem', minHeight: '100vh' }}
        >
        { user && user.role === 1 ? (<h3>Bạn không có quyền truy cập</h3>) : (
          todayRevenues && todayBills && todaySales && newestOrders && newestReviews && newestComments && monthlyRevenues && annualRevenues && (
            <div className="site-card-wrapper">
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
                          <TodayRevenues />
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
                          <MonthlyRevenues />
                        }
                        title={ monthlyRevenues.monthlyRevenues.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) || "0đ"}
                        description="Doanh thu cửa hàng năm này"
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
                          <AnnualRevenues />
                        }
                        title={ annualRevenues.annualRevenues.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) || "0đ"}
                        description="Doanh thu cửa hàng tháng này"
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
                          <TodayBills />
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
                          <TodaySales />
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
                          <NewestOrders />
                        }
                        title={newestOrders.orderCount || "0"}
                        description="Tổng số đơn hàng mới đặt hôm nay"
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
                          <NewestReviews />
                        }
                        title={ newestReviews.reviewCount || "0"}
                        description="Tổng số đánh giá sản phẩm mới nhất"
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
                          <NewestComments />
                        }
                        title={ newestComments.commentCount || "0"}
                        description="Tổng số bình luận mới nhất"
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row>
            </div>
          )
        )}
        </div>
    </section>
  )
}

Statistical.propTypes = {
  loadOverallStatisticalData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  statistical: state.statistical,
  auth: state.auth
});

export default connect(mapStateToProps, {loadOverallStatisticalData})(Statistical);
