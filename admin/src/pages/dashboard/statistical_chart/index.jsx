import React, { Fragment, useState, useEffect } from "react";
import OrdersChart from "./orders_chart";
import RevenuesChart from "./revenues_chart";
import { connect } from "react-redux";
import {
  getOrdersChartData,
  getRevenuesChartData,
} from "../../../redux/actions/statistical";
import { Loader } from "../../../components";
import './styles.scss';
const StatisticalChart = ({
  year,
  statistical: { ordersDataChart, revenuesDataChart },
  getOrdersChartData,
  getRevenuesChartData,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await Promise.all([getOrdersChartData(year), getRevenuesChartData(year)]);
      setLoading(false);
    }
    getData();
  }, [year]);
  return (
    <div style={{ marginTop: "5rem" }}>
      {loading ? (
        <Loader className={"chart-loader"} />
      ) : (
        <Fragment>
          <OrdersChart year={year} ordersDataChart={ordersDataChart} />
          <RevenuesChart year={year} revenuesDataChart={revenuesDataChart} />
        </Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  statistical: state.statistical,
});
export default connect(mapStateToProps, {
  getOrdersChartData,
  getRevenuesChartData,
})(StatisticalChart);
