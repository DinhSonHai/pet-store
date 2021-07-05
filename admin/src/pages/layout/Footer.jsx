import { Layout } from 'antd';
const { Footer } = Layout;
const FooterLayout = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      PetStore ©{new Date().getFullYear()} Created by Duc Dao
    </Footer>
  );
};
export default FooterLayout;
