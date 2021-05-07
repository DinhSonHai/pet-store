/* eslint-disable import/no-anonymous-default-export */
import { Spin } from 'antd';
import './styles.scss';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;
export default ({ className }) => {
  return (
    <section className={className}>
      <Spin indicator={antIcon} />
    </section>
  );
};
