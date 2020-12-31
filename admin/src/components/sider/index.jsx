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
  TeamOutlined,
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
          <Link to='/?tab=orders'>Quản lý hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key='users_management' icon={<UserOutlined />}>
          <Link to='/?tab=users'>Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item key='frontend_management' icon={<DesktopOutlined />}>
          <Link to='/?tab=frontend'>Quản lý UI/UX</Link>
        </Menu.Item>
        <Menu.Item key='posts_management' icon={<PaperClipOutlined />}>
          <Link to='/?tab=posts'>Quản lý bài đăng</Link>
        </Menu.Item>
        <SubMenu
          key='employee_management'
          icon={<TeamOutlined />}
          title='Quản lý nhân viên'
        >
          <Menu.Item key='employees'>
            <Link to='/?tab=employees'>Nhân viên</Link>
          </Menu.Item>
          <Menu.Item key='account'>
            <Link to='/?tab=signup'>Tài khoản</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='statistical' icon={<BarChartOutlined />}>
          <Link to='/?tab=statistical'>Thống kê</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SiderComponent;
