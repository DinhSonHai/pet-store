import { useState, useEffect } from 'react';
import { Layout } from 'antd';

import { SiderComponent } from '../../components';
import { Category, Footer, Navbar, DashBoard } from '../../pages';

import queryString from 'query-string';
import './styles.scss';

const { Content } = Layout;

const Home = ({ location }) => {
  let tab = queryString.parse(location.search).tab || 'dashboard';
  const [tabState, setTabState] = useState(tab);
  useEffect(() => {
    setTabState(tab);
  }, [tab]);
  function page() {
    switch (tabState) {
      case 'category':
        return <Category />;
      default:
        return <DashBoard />;
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderComponent tabState={tabState} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 1rem' }}>{page()}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Home;