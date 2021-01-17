import { AnnualRevenues } from '../../icons';
import { Skeleton, Card, Col, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;
const DashBoardLoader = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Row gutter={[16, 16]}>
      {list.map((item) => (
        <Col key={item} xs={24} sm={24} md={12} lg={8} xl={6}>
          <Card actions={[<EllipsisOutlined key='ellipsis' />]}>
            <Skeleton loading={true} avatar active>
              <Meta
                avatar={<AnnualRevenues />}
                title={'loading'}
                description={`loading`}
              />
            </Skeleton>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default DashBoardLoader;
