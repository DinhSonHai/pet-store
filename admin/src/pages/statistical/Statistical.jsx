import React, { useState, useEffect } from 'react';
import { Breadcrumb, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';
import Chart from '../chart/Chart';
import { Skeleton, Switch, Card, Avatar, Col, Row } from 'antd';
import { loadOverallStatisticalData, loadChartData } from '../../redux/actions/statistical';
import { TodayRevenues, TodayBills, TodaySales, NewestOrders, NewestReviews, NewestComments, MonthlyRevenues, AnnualRevenues } from '../../icons';
const { Meta } = Card;
const { Option } = Select;

const Statistical = ({
  statistical: { todayRevenues, todayBills, todaySales, newestOrders, newestReviews, newestComments, monthlyRevenues, annualRevenues, ordersDataChart, revenuesDataChart },
  auth: { user },
  loadOverallStatisticalData,
  loadChartData,
  match,
  location,
  history,
}) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("2021");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await loadOverallStatisticalData();
      await loadChartData();
      setLoading(false);
      // setReset(true);
    }
    getData();
  }, [user, loadOverallStatisticalData]);

  const handleChange = async (value) => {
    await loadChartData(value);
    setYear(value);
  }

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
            <div>
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
              <div style={{ marginTop: "20px" }}>
                Lọc biểu đồ theo năm: 
                <Select defaultValue="2021" onChange={handleChange}>
                  <Option value="2021">2021</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                </Select>
                <Chart year={year} />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

Statistical.propTypes = {
  loadOverallStatisticalData: PropTypes.func.isRequired,
  loadChartData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  statistical: state.statistical,
  auth: state.auth
});

export default connect(mapStateToProps, { loadOverallStatisticalData, loadChartData })(Statistical);
