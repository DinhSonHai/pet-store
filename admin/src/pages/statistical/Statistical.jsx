import { useState, useEffect } from "react";
import { Breadcrumb, Select } from "antd";
import { getStatisticalData } from "../../redux/actions/statistical";
import { connect } from "react-redux";
import StatisticDashBoard from "./statistic";
import StatisticalChart from "./chart";
import BestSeller from "./bestseller";
import moment from "moment";

import "./styles.scss";
const { Option } = Select;
const optionsSelect = [
  { title: "Ngày hôm nay", value: "day" },
  { title: "Tuần này", value: "week" },
  { title: "Tháng này", value: "month" },
  { title: "Năm nay", value: "year" },
  { title: "Khoảng thời gian", value: "range" },
];

const Statistical = ({
  statisticalData: { totalRevenues, totalBills, totalSold, bestsellers },
  getStatisticalData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState("day");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await getStatisticalData(time, "", "");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    getData();
  }, [getStatisticalData, time]);

  const handleRenderTimeLabel = () => {
    switch (time) {
      case "day":
        return (
          <p>
            Ngày: <span>{`${moment(new Date()).format("DD/MM/YYYY")}`}</span>
          </p>
        );
      case "week":
        const startWeek = moment().startOf("week");
        const endWeek = moment(startWeek).endOf("week");
        return (
          <p>
            Tuần thứ {moment().week() - 1}:{" "}
            <span>{`${moment(startWeek).format("DD/MM/YYYY")} --- ${moment(
              endWeek
            ).format("DD/MM/YYYY")}`}</span>
          </p>
        );
      case "month":
        const starMonth = moment().startOf("month");
        const endMonth = moment(starMonth).endOf("month");
        return (
          <p>
            Tháng {`${new Date().getMonth() + 1}`}:{" "}
            <span>{`${moment(starMonth).format("DD/MM/YYYY")} --- ${moment(
              endMonth
            ).format("DD/MM/YYYY")}`}</span>
          </p>
        );
      case "year":
        return (
          <p>
            Năm: <span>{`${new Date().getFullYear()}`}</span>
          </p>
        );
      default:
        return null;
    }
  };
  return (
    <section className="statistical">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb style={{ margin: "1rem 2rem" }}>
          <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ marginRight: "1rem" }}>
          <span style={{ marginRight: "1rem" }}>Xem thống kê: </span>
          <Select
            style={{ width: "150px" }}
            defaultValue="day"
            onChange={(value) => setTime(value)}
          >
            {optionsSelect.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="statistic-time"
        >
          {handleRenderTimeLabel()}
        </div>
      </div>
      <div
        className="category__wrap site-layout-background"
        style={{ padding: "1.5rem", minHeight: "100vh" }}
      >
        <StatisticDashBoard
          isLoading={isLoading}
          totalRevenues={totalRevenues}
          totalBills={totalBills}
          totalSold={totalSold}
        />
        <BestSeller isLoading={isLoading} bestsellers={bestsellers} />
        <StatisticalChart />
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  statisticalData: state.statistical.statisticalData,
});
export default connect(mapStateToProps, { getStatisticalData })(Statistical);
