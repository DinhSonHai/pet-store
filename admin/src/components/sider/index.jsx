import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  // DesktopOutlined,
  BarsOutlined,
  PieChartOutlined,
  AuditOutlined,
  // UserOutlined,
  BarChartOutlined,
  // PaperClipOutlined,
  // TeamOutlined,
  ImportOutlined,
  BarcodeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import './styles.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = ({ tabState, auth: { user } }) => {
  const [style, setStyle] = useState({});
  const onCollapse = (collapsed) => {};
  const onBreakpoint = (broken) => {
    if (broken) {
      const st = {
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 999,
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
      <Menu theme='dark' defaultSelectedKeys={[tabState]} mode='inline'>
        <Menu.Item key='dashboard' icon={<PieChartOutlined />}>
          <Link to='/'>Dashboard</Link>
        </Menu.Item>
        <SubMenu
          key='products_managment'
          icon={<BarsOutlined />}
          title='Quản lý sản phẩm'
        >
          <Menu.Item key='category'>
            <Link to='/?tab=category'>Danh mục</Link>
          </Menu.Item>
          <Menu.Item key='type'>
            <Link to='/?tab=type'>Loại sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key='product'>
            <Link to='/?tab=product'>Sản phẩm</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='order' icon={<AuditOutlined />}>
          <Link to='/?tab=order'>Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key='bill' icon={<BarcodeOutlined />}>
          <Link to='/?tab=bill'>Quản lý hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key='receipt' icon={<ImportOutlined />}>
          <Link to='/?tab=receipt'>Quản lý phiếu nhập</Link>
        </Menu.Item>
        <Menu.Item key='review' icon={<CommentOutlined />}>
          <Link to='/?tab=review'>Quản lý bình luận</Link>
        </Menu.Item>
        {/* <Menu.Item key='user' icon={<UserOutlined />}>
          <Link to='/?tab=user'>Quản lý người dùng</Link>
        </Menu.Item> */}
        {/* <SubMenu
          key='employee_management'
          icon={<TeamOutlined />}
          title='Quản lý nhân viên'
        >
          <Menu.Item key='employee'>
            <Link to='/?tab=employee'>Nhân viên</Link>
          </Menu.Item>
          <Menu.Item key='account'>
            <Link to='/?tab=account'>Tài khoản</Link>
          </Menu.Item>
        </SubMenu> */}
        {/* <Menu.Item key='post' icon={<PaperClipOutlined />}>
          <Link to='/?tab=post'>Quản lý bài đăng</Link>
        </Menu.Item>
        <Menu.Item key='frontend' icon={<DesktopOutlined />}>
          <Link to='/?tab=frontend'>Quản lý UI/UX</Link>
        </Menu.Item> */}
        {user && user.role === 0 && (
          <Menu.Item key='statistical' icon={<BarChartOutlined />}>
            <Link to='/?tab=statistical'>Thống kê</Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SiderComponent);
