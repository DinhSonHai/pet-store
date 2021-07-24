import React, { Fragment } from "react";
import OrdersChart from "./orders_chart";
import RevenuesChart from "./revenues_chart";
const StatisticalChart = ({ year }) => {
  return (
    <Fragment>
      <div style={{ marginTop: "5rem" }}>
        <OrdersChart year={year} />
        <RevenuesChart year={year} />
      </div>
    </Fragment>
  );
};
export default StatisticalChart;
