import { NewestComments } from '../../../assets/icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './styles.scss';
const { Meta } = Card;
const NewestCommentsCard = ({ loading, newestComments }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='newest-comments-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<NewestComments />}
            title={newestComments || '0'}
            description={`Bình luận chờ xét duyệt`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default NewestCommentsCard;
