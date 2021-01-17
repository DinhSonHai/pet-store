import { TodayBills } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './styles.scss';
const { Meta } = Card;

const TodayBillsCard = ({ loading, todayBills }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='today-bills-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<TodayBills />}
            title={todayBills || '0'}
            description={`Hóa đơn hoàn thành hôm nay - D${dayjs().date()}`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default TodayBillsCard;
