import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getOrdersChartData } from '../../../redux/actions/statistical';
import { Loader } from '../../../components';
import { Bar } from 'react-chartjs-2';
import './styles.scss';

const RevenuesChart = ({ getOrdersChartData, ordersDataChart, year }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getOrdersChartData(year);
      setLoading(false);
    }
    getData();
  }, [getOrdersChartData, year]);
  return (
    <Fragment>
      {loading ? (
        <Loader className='order-chart-loader' />
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          <Bar
            data={{
              labels: [
                'Tháng 1 ',
                'Tháng 2 ',
                'Tháng 3 ',
                'Tháng 4 ',
                'Tháng 5 ',
                'Tháng 6 ',
                'Tháng 7 ',
                'Tháng 8 ',
                'Tháng 9 ',
                'Tháng 10 ',
                'Tháng 11 ',
                'Tháng 12 ',
              ],
              datasets: [
                {
                  label: ` Số đơn đặt hàng mỗi tháng trong năm ${year}`,
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
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
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  ordersDataChart: state.statistical.ordersDataChart,
});
export default connect(mapStateToProps, { getOrdersChartData })(RevenuesChart);
