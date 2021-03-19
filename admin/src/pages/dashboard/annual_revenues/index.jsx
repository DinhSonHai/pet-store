import { AnnualRevenues } from '../../../assets/icons';
import { Skeleton, Card, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './styles.scss';
const { Meta } = Card;
const AnnualRevenuesCard = ({ loading, annualRevenues }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <Card
        hoverable
        className='annual-revenues-card'
        actions={[<EllipsisOutlined key='ellipsis' />]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<AnnualRevenues />}
            title={
              annualRevenues
                ? annualRevenues.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '0đ'
            }
            description={`Doanh thu năm nay - Y${dayjs().year()}`}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

export default AnnualRevenuesCard;
