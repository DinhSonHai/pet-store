import React, { Fragment, useState, useEffect } from "react";
import { Select } from "antd";
import OrdersChart from "./orders_chart";
import RevenuesChart from "./revenues_chart";
import { connect } from "react-redux";
import {
  getOrdersChartData,
  getRevenuesChartData,
} from "../../../redux/actions/statistical";
import { Loader } from "../../../components";
import dayjs from 'dayjs';
import './styles.scss';
const { Option } = Select;
const listYear = [
  dayjs().year(),
  dayjs().year() - 1,
  dayjs().year() - 2,
  dayjs().year() - 3,
  dayjs().year() - 4,
  dayjs().year() - 5,
  dayjs().year() - 6,
];
const StatisticalChart = ({
  statistical: { ordersDataChart, revenuesDataChart },
  getOrdersChartData,
  getRevenuesChartData,
}) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(dayjs().year());
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await Promise.all([getOrdersChartData(year), getRevenuesChartData(year)]);
      setLoading(false);
    }
    getData();
  }, [year, getOrdersChartData, getRevenuesChartData]);
  const handleChange = async (value) => {
    setYear(value);
  };
  return (
    <div style={{ marginTop: "5rem" }}>
      {loading ? (
        <Loader className={"chart-loader"} />
      ) : (
        <Fragment>
           <div style={{ margin: "1rem" }}>
            <span style={{ marginRight: "1rem" }}>Xem biểu đồ theo năm:</span>
            <Select defaultValue="2021" onChange={handleChange}>
              {listYear.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
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
