import { Breadcrumb } from 'antd';
import './styles.scss';
const Statistical = () => {
  return (
    <section className='statistical'>
      <Breadcrumb style={{ margin: '1rem 2rem' }}>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className='category__wrap site-layout-background'
        style={{ padding: '1.5rem', minHeight: '100vh' }}
      >
       thongke
      </div>
    </section>
  );
};

export default Statistical;
