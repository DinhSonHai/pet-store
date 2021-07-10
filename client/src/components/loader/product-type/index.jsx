import { Row, Col, Skeleton, Card } from "antd";
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
          <Card bordered={false}>
            <div className="loading__image-skeleton">
              <Skeleton.Input size="large" active />
            </div>
            <div className="loading__price-skeleton">
              <Skeleton.Input size="small" active />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default ProductTypeLoader;
