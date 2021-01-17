import { MonthlyRevenues } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './styles.scss';
const { Meta } = Card;

const MonthRevenuesCard = ({ loading, monthlyRevenues }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='month-revenues-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<MonthlyRevenues />}
            title={
              monthlyRevenues
                ? monthlyRevenues.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '0đ'
            }
            description={`Doanh thu tháng này - T${dayjs().month() + 1}`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default MonthRevenuesCard;
