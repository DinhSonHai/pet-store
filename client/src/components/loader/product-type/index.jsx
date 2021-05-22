import { Row, Col, Skeleton } from 'antd';
const ProductTypeLoader = () => {
  return (
    <Row
      gutter={[
        { xs: 8, sm: 16, md: 16, lg: 16 },
        { xs: 8, sm: 16, md: 16, lg: 16 },
      ]}
    >
      {[1, 2, 3, 4].map((item) => (
        <Col key={item} xs={12} sm={8} md={6} lg={6}>
          <div className='products-type__large-skeleton'>
            <Skeleton.Input size='large' active />
          </div>
          <div className='products-type__small-skeleton'>
            <Skeleton.Input size='small' active />
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default ProductTypeLoader;
