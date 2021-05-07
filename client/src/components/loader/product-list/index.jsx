import { Row, Col, Skeleton } from 'antd';
const ProductListLoader = () => {
  return (
    <Row
      gutter={[
        { xs: 4, sm: 8, md: 16, lg: 16 },
        { xs: 4, sm: 8, md: 16, lg: 16 },
      ]}
    >
      {[1, 2, 3, 4].map((item) => (
        <Col key={item} xs={12} sm={12} md={8} lg={6}>
          <div className='products-list__image-skeleton'>
            <Skeleton.Input size='large' active />
          </div>
          <div className='products-list__star-skeleton'>
            <Skeleton.Input size='small' active />
          </div>
          <div className='products-list__price-skeleton'>
            <Skeleton.Input size='small' active />
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default ProductListLoader;
