import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { SiderComponent } from '../../components';
import { Category, Footer, Navbar } from '../../pages';

import queryString from 'query-string';
import './styles.scss';

const { Content } = Layout;

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
        <Navbar />
        <Content style={{ margin: '0 1rem' }}>
          {tabState === 'category' ? <Category /> : null}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Home;
