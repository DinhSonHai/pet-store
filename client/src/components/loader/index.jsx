/* eslint-disable import/no-anonymous-default-export */
import { Spin } from 'antd';
import './styles.scss';

export default () => {
  return (
    <section className='loader'>
      <Spin size='large' />
    </section>
  );
};
