import { Layout, Row, Col, Card, Menu, Dropdown, Button } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import './styles.css';
const { Content } = Layout;
const { Meta } = Card;
const menu = (
  <Menu>
    <Menu.Item key='1' icon={<UserOutlined />}>
      Thứ tự theo: điểm đánh giá
    </Menu.Item>
    <Menu.Item key='2' icon={<UserOutlined />}>
      Thứ tự theo: mức độ yêu thích
    </Menu.Item>
    <Menu.Item key='3' icon={<UserOutlined />}>
      Thứ tự theo: giá thấp đến cao
    </Menu.Item>
    <Menu.Item key='3' icon={<UserOutlined />}>
      Thứ tự theo: giá cao đến thấp
    </Menu.Item>
  </Menu>
);
export const Pets = () => {
  return (
    <Content className='pets'>
      <section className='container'>
        <div className='pets__header'>
          <h1 className='pets__header-title'>Pets</h1>
          <div className='pets__header-filter'>
            <Dropdown overlay={menu}>
              <Button>
                Mới nhất <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className='pets-list'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt='example' src='https://picsum.photos/260' />}
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt='example' src='https://picsum.photos/260' />}
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt='example' src='https://picsum.photos/260' />}
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt='example' src='https://picsum.photos/260' />}
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt='example' src='https://picsum.photos/260' />}
              >
                <Meta
                  title='Europe Street beat'
                  description='www.instagram.com'
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </Content>
  );
};
