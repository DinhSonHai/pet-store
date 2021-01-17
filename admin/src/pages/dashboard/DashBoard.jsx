import React, { useState, useEffect } from 'react';
import { Breadcrumb, Row } from 'antd';
import { connect } from 'react-redux';
import { getDashBoardData } from '../../redux/actions/statistical';
import {
  TodayRevenuesCard,
  MonthRevenuesCard,
  AnnualRevenuesCard,
  TodayNewestOrdersCard,
  NewestReviewsCard,
  NewestCommentsCard,
  TodayBillsCard,
  TodaySalesCard,
  DashboardLoader,
} from '../../components';
import './styles.scss';
const DashBoard = ({
  getDashBoardData,
  dashboadData: {
    todayRevenues,
    todayBills,
    todaySales,
    newestOrders,
    newestReviews,
    newestComments,
    monthlyRevenues,
    annualRevenues,
  },
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getDashBoardData();
      setLoading(false);
    }
    getData();
  }, [getDashBoardData]);

  return (
    <section className='dashboard'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Trang chủ quản trị</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='dashboard__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        {loading ? (
          <DashboardLoader />
        ) : (
          <Row gutter={[16, 16]}>
            <TodayRevenuesCard
              loading={loading}
              todayRevenues={todayRevenues}
            />

            <MonthRevenuesCard
              loading={loading}
              monthlyRevenues={monthlyRevenues}
            />

            <AnnualRevenuesCard
              loading={loading}
              annualRevenues={annualRevenues}
            />

            <TodayNewestOrdersCard
              loading={loading}
              newestOrders={newestOrders}
            />

            <NewestReviewsCard
              loading={loading}
              newestReviews={newestReviews}
            />

            <NewestCommentsCard
              loading={loading}
              newestComments={newestComments}
            />

            <TodayBillsCard loading={loading} todayBills={todayBills} />

            <TodaySalesCard loading={loading} todaySales={todaySales} />
          </Row>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  dashboadData: state.statistical.dashboardData,
});

export default connect(mapStateToProps, {
  getDashBoardData,
})(DashBoard);
