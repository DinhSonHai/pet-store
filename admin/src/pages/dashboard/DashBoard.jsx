import React, { useState, useEffect } from "react";
import { Breadcrumb, Row, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getDashBoardData } from "../../redux/actions/statistical";
import TodayRevenuesCard from "./today_revenues";
import MonthRevenuesCard from "./month_revenues";
import AnnualRevenuesCard from "./annual_revenues";
import TodayNewestOrdersCard from "./today_new_orders";
import NewestReviewsCard from "./new_reviews";
import UserCountCard from "./user_count";
import TodayBillsCard from "./today_bills";
import TodaySalesCard from "./today_sales";
import "./styles.scss";

const DashBoard = ({
  getDashBoardData,
  dashboadData: {
    todayRevenues,
    todayBills,
    todaySales,
    newestOrders,
    newestReviews,
    userCount,
    monthlyRevenues,
    annualRevenues,
  },
}) => {
  const [loading, setLoading] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getDashBoardData();
      setLoading(false);
    }
    getData();
  }, [getDashBoardData, updateState]);
  return (
    <section className="dashboard">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb style={{ margin: "1rem 2rem" }}>
          <Breadcrumb.Item>Trang chủ quản trị</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ marginRight: "1.5rem" }}>
          <Button
            icon={<SyncOutlined />}
            onClick={() => setUpdateState(!updateState)}
            disabled={loading}
            type="primary"
          >
            Cập nhật
          </Button>
        </div>
      </div>
      <div
        className="dashboard__wrap site-layout-background"
        style={{ padding: "1.5rem", minHeight: "100vh" }}
      >
        <Row gutter={[16, 16]}>
          <TodayRevenuesCard loading={loading} todayRevenues={todayRevenues} />

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

          <NewestReviewsCard loading={loading} newestReviews={newestReviews} />

          <UserCountCard loading={loading} userCount={userCount} />

          <TodayBillsCard loading={loading} todayBills={todayBills} />

          <TodaySalesCard loading={loading} todaySales={todaySales} />
        </Row>
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
