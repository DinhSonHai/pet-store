import { NewestReviews } from '../../../icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.scss';
const { Meta } = Card;

const NewestReviewsCard = ({ loading, newestReviews }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='newest-reviews-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<NewestReviews />}
            title={newestReviews || '0'}
            description={`Đánh giá chờ xét duyệt`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default NewestReviewsCard;
