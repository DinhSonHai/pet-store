import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  BarsOutlined,
  PieChartOutlined,
  AuditOutlined,
  UserOutlined,
  BarChartOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

import './styles.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = () => {
  const [style, setStyle] = useState({});
  const onCollapse = (collapsed) => {};
  const onBreakpoint = (broken) => {
    if (broken) {
      const st = {
        height: '100vh',
        position: 'fixed',
        left: 0,
      };
      setStyle(st);
      return;
    }
    setStyle({});
  };
  return (
    <Sider
      style={style}
      breakpoint='lg'
      collapsedWidth={0}
      collapsible
      onBreakpoint={onBreakpoint}
      onCollapse={onCollapse}
    >
      <Link to='/' className='logo'>
        PetStore.
      </Link>
      <Menu theme='dark' defaultSelectedKeys={['dashboard']} mode='inline'>
        <Menu.Item key='dashboard' icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>

        <SubMenu
          key='products_managment'
          icon={<BarsOutlined />}
          title='Quản lý sản phẩm'
        >
          <Menu.Item key='categories'>
            <Link to='/?tab=category'>Danh mục</Link>
          </Menu.Item>
          <Menu.Item key='types'>
            <Link to='/?tab=types'>Loại sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key='products'>
            <Link to='/?tab=products'>Sản phẩm</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='orders_management' icon={<AuditOutlined />}>
          Quản lý hóa đơn
        </Menu.Item>
        <Menu.Item key='users_management' icon={<UserOutlined />}>
          Quản lý người dùng
        </Menu.Item>
        <Menu.Item key='frontend_management' icon={<DesktopOutlined />}>
          Quản lý UI/UX
        </Menu.Item>
        <Menu.Item key='posts_management' icon={<PaperClipOutlined />}>
          Quản lý bài đăng
        </Menu.Item>
        <Menu.Item key='statistical' icon={<BarChartOutlined />}>
          Thống kê
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SiderComponent;
