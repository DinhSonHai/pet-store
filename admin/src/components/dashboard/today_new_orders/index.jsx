import { NewestOrders } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.scss';
const { Meta } = Card;

const TodayNewestOrdersCard = ({ loading, newestOrders }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='today-newest-orders-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<NewestOrders />}
            title={newestOrders || '0'}
            description={`Đơn hàng chờ xét duyệt`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default TodayNewestOrdersCard;
