import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Loader } from '../../components';
import { loadChartData } from '../../redux/actions/statistical';
import { Bar, Line } from 'react-chartjs-2';

const Chart = ({
  year,
  statistical: { ordersDataChart, revenuesDataChart },
}) => {
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState({});
  const [revenuesData, setRevenuesData] = useState({});

  useEffect(() => {
    setLoading(true);
    setOrdersData({
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          label: `Số đơn đặt hàng mỗi tháng trong năm ${year}`,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: ordersDataChart,
        },
      ],
    });
    setRevenuesData({
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          label: `Doanh thu mỗi tháng trong năm ${year}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: revenuesDataChart,
        },
      ],
    });
    setLoading(false);
  }, [year, ordersDataChart, revenuesDataChart]);

  return (
    <div className='chart'>
      {loading ? (
        <Loader className={'loader'} />
      ) : (
        ordersData &&
        revenuesData && (
          <div>
            <div style={{ border: '1px solid gray', marginTop: '20px' }}>
              <Bar
                data={ordersData}
                height={400}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div style={{ border: '1px solid gray', marginTop: '20px' }}>
              <Line data={revenuesData} height={100} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

Chart.propTypes = {
  loadChartData: PropTypes.func.isRequired,
  setReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  statistical: state.statistical,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadChartData })(Chart);
