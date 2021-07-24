import { useState, useEffect } from "react";
import { Layout } from "antd";

import queryString from "query-string";
import {
  Category,
  Footer,
  Navbar,
  DashBoard,
  Type,
  Product,
  Receipts,
  Order,
  Bill,
  Review,
  Statistical,
  Blog,
  DiscountOffer,
  Contacts,
  Promo,
  Notification,
  Customer
} from "../../pages";

import { SiderComponent } from "../../components";

const { Content } = Layout;

const Home = ({ location }) => {
  let tab = queryString.parse(location.search).tab || "dashboard";

  const [tabState, setTabState] = useState(tab);

  useEffect(() => {
    setTabState(tab);
  }, [tab]);

  function page() {
    switch (tabState) {
      case "category":
        return <Category />;
      case "type":
        return <Type />;
      case "product":
        return <Product />;
      case "receipt":
        return <Receipts />;
      case "order":
        return <Order />;
      case "bill":
        return <Bill />;
      case "review":
        return <Review />;
      case "statistical":
        return <Statistical />;
      case "blog":
        return <Blog />;
      case "discountOffer":
        return <DiscountOffer />;
      case "contacts":
        return <Contacts />;
      case "promo":
        return <Promo />;
      case 'notifications':
        return <Notification />;
      case 'customers':
        return <Customer />
      default:
        return <DashBoard />;
    }
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderComponent tabState={tabState} />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: "0 1rem" }}>{page()}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default Home;
