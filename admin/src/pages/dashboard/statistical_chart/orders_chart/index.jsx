import { Bar } from "react-chartjs-2";

const RevenuesChart = ({ ordersDataChart, year }) => {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <Bar
        data={{
          labels: [
            "Tháng 1 ",
            "Tháng 2 ",
            "Tháng 3 ",
            "Tháng 4 ",
            "Tháng 5 ",
            "Tháng 6 ",
            "Tháng 7 ",
            "Tháng 8 ",
            "Tháng 9 ",
            "Tháng 10 ",
            "Tháng 11 ",
            "Tháng 12 ",
          ],
          datasets: [
            {
              label: ` Số đơn đặt hàng mỗi tháng trong năm ${year}`,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: ordersDataChart,
            },
          ],
        }}
        height={500}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default RevenuesChart;
