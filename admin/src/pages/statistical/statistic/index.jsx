import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { AnnualRevenues, TodayBills, TodaySales } from "../../../assets/icons";

const StatisticDashBoard = ({
  isLoading,
  totalRevenues,
  totalBills,
  totalSold,
}) => {
  return (
    <div className="statistic-dashboard">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            bordered={false}
            actions={[<EllipsisOutlined key="ellipsis" />]}
          >
            <Statistic
              loading={isLoading}
              title="Doanh thu"
              value={totalRevenues?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              valueStyle={{ color: "#106eea" }}
              prefix={<AnnualRevenues />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            bordered={false}
            actions={[<EllipsisOutlined key="ellipsis" />]}
          >
            <Statistic
              loading={isLoading}
              title="Hóa đơn hoàn thành"
              value={totalBills}
              valueStyle={{ color: "#106eea" }}
              prefix={<TodayBills />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            bordered={false}
            actions={[<EllipsisOutlined key="ellipsis" />]}
          >
            <Statistic
              loading={isLoading}
              title="Sản phẩm bán ra"
              value={totalSold}
              valueStyle={{ color: "#106eea" }}
              prefix={<TodaySales />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default StatisticDashBoard;
