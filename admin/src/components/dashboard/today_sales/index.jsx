import { TodaySales } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './styles.scss';
const { Meta } = Card;

const TodaySalesCard = ({ loading, todaySales }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='today-sales-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<TodaySales />}
            title={todaySales || '0'}
            description={`Sản phẩm bán ra hôm nay - D${dayjs().date()}`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default TodaySalesCard;
