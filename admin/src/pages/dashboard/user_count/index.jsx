import { UserCounts } from '../../../assets/icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.scss';
const { Meta } = Card;
const UserCountCard = ({ loading, userCount }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='newest-comments-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<UserCounts />}
            title={userCount || '0'}
            description={`Số lượng người dùng`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default UserCountCard;
