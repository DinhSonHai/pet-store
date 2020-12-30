import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { SiderComponent } from '../../components';
import { Category } from '../../pages';

import queryString from 'query-string';
import './styles.scss';

const { Header, Content, Footer } = Layout;

const Home = ({ location }) => {
  let tab = queryString.parse(location.search).tab;
  const [tabState, setTabState] = useState(tab || '');
  useEffect(() => {
    setTabState(tab);
  }, [tab]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderComponent />
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 1rem' }}>
          {tabState === 'category' ? <Category /> : null}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          PetStore ©2020 Created by Duc Dao
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
