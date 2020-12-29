import { useState, useEffect } from 'react';
import { Card, Row, Col, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { Loader } from '../../components';
import { connect } from 'react-redux';
import { getTypesByCatId } from '../../redux/actions/products';
import './styles.scss';

const PetsType = ({ getTypesByCatId, match }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await getTypesByCatId(match.params.id);
      setData(res);
      setIsLoading(false);
    }
    getData();
  }, [getTypesByCatId, match.params.id]);
  return (
    <section className='petsType'>
      <div className='petsType__wrap container'>
        <div className='petsType__header'>
          {' '}
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link className='petsType__header-title' to='/'>
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className='petsType__header-title'>Chó cảnh</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <Loader className={'loader'} />
        ) : (
          <div className='petsType__content'>
            <Row gutter={[16, 16]}>
              {data.map((item) => (
                <Col key={item._id} xs={12} sm={8} md={6} lg={6}>
                  <Link to={`/pets/types/${item._id}`}>
                    <Card
                      bordered={false}
                      cover={
                        <img
                          width='100%'
                          height='100%'
                          alt='example'
                          src={item.typeImg}
                        />
                      }
                    >
                      <p className='petsType__desc'>{item.typeName}</p>
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
export default connect(null, { getTypesByCatId })(PetsType);
