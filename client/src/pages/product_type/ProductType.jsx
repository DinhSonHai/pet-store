import { useState, useEffect } from 'react';
import { Card, Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { Loader } from '../../components';
import { connect } from 'react-redux';
import { getTypesByCatId } from '../../redux/actions/types';
import './styles.scss';

const ProductType = ({ getTypesByCatId, match, types: { types } }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getTypesByCatId(match.params.id);
      setIsLoading(false);
    }
    getData();
  }, [getTypesByCatId, match.params.id]);
  const redirectUrl = (id) => {
    switch (match.params.type) {
      case 'dog':
      case 'cat':
        return `/products/${match.params.type}/post/${id}`;
      default:
        return `/products/${match.params.type}/list/${id}`;
    }
  };
  return (
    <section className='products-type'>
      <div className='products-type__wrap container'>
        <div className='products-type__header'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link className='products-type__header-title' to='/'>
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className='products-type__header-title'>
                {match.params.type === 'dog'
                  ? 'Chó cảnh'
                  : match.params.type === 'cat'
                  ? 'Mèo cảnh'
                  : match.params.type === 'food'
                  ? 'Thức ăn'
                  : match.params.type === 'accessories' && 'Phụ kiện'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <Loader className={'loader-inside'} />
        ) : (
          <div className='products-type__content'>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 16, lg: 16 },
                { xs: 8, sm: 16, md: 16, lg: 16 },
              ]}
            >
              {types.map((item) => (
                <Col key={item._id} xs={12} sm={8} md={6} lg={6}>
                  <Link to={redirectUrl(item._id)}>
                    <Card bordered={false} hoverable>
                      <div
                        style={{
                          textAlign: 'center',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <img
                          width='100%'
                          height='auto'
                          alt='example'
                          src={item.typeImg}
                        />
                      </div>
                      <p className='products-type__desc'>{item.typeName}</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  types: state.types,
});
export default connect(mapStateToProps, { getTypesByCatId })(ProductType);
