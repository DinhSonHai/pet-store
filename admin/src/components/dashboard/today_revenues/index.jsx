import { TodayRevenues } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './styles.scss';
const { Meta } = Card;

const TodayRevenuesCard = ({ loading, todayRevenues }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='today-revenues-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<TodayRevenues />}
            title={
              todayRevenues
                ? todayRevenues.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '0đ'
            }
            description={`Doanh thu ngày hôm nay - D${dayjs().date()}`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default TodayRevenuesCard;
