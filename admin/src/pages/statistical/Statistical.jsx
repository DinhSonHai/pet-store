import { useState } from 'react';
import { Breadcrumb, Select } from 'antd';
import { OrdersChart, RevenuesChart } from '../../components';
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
const Statistical = () => {
  const [year, setYear] = useState(2021);
  const handleChange = async (value) => {
    setYear(value);
  };
  return (
    <section className='statistical'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='category__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
        <div style={{ marginTop: '1.5rem' }}>
          <span style={{ marginRight: '1rem' }}>Lọc biểu đồ theo năm:</span>
          <Select defaultValue='2021' onChange={handleChange}>
            {listYear.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
        <OrdersChart year={year} />
        <RevenuesChart year={year} />
      </div>
    </section>
  );
};

export default Statistical;
