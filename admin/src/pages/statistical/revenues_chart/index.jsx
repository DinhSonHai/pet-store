import { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getRevenuesChartData } from '../../../redux/actions/statistical';
import { Line } from 'react-chartjs-2';
import { Loader } from '../../../components';

import './styles.scss';

const RevenuesChart = ({ revenuesDataChart, getRevenuesChartData, year }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await getRevenuesChartData(year);
      setLoading(false);
    }
    getData();
  }, [getRevenuesChartData, year]);
  return (
    <Fragment>
      {loading ? (
        <Loader className='revenues-chart-loader' />
      ) : (
        <div style={{ marginTop: '6rem' }}>
          <Line
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
                  label: ` Doanh thu mỗi tháng trong năm ${year}`,
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
            }}
            height={100}
          />
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  revenuesDataChart: state.statistical.revenuesDataChart,
});
export default connect(mapStateToProps, { getRevenuesChartData })(
  RevenuesChart
);
