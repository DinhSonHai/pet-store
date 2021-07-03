import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BarsOutlined,
  PieChartOutlined,
  AuditOutlined,
  BarChartOutlined,
  ImportOutlined,
  BarcodeOutlined,
  CommentOutlined,
  HighlightOutlined,
  DollarCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import "./styles.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderComponent = ({ tabState, auth: { user } }) => {
  const [style, setStyle] = useState({});
  const onCollapse = (collapsed) => {};
  const onBreakpoint = (broken) => {
    if (broken) {
      const st = {
        height: "100vh",
        position: "fixed",
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
      breakpoint="lg"
      collapsedWidth={0}
      collapsible
      onBreakpoint={onBreakpoint}
      onCollapse={onCollapse}
    >
      <Link to="/" className="logo">
        PetStore.
      </Link>
      <Menu theme="dark" selectedKeys={[tabState]} mode="inline">
        <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <SubMenu
          key="products_managment"
          icon={<BarsOutlined />}
          title="Quản lý sản phẩm"
        >
          <Menu.Item key="category">
            <Link to="/?tab=category">Danh mục</Link>
          </Menu.Item>
          <Menu.Item key="type">
            <Link to="/?tab=type">Loại sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="product">
            <Link to="/?tab=product">Sản phẩm</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="order" icon={<AuditOutlined />}>
          <Link to="/?tab=order">Quản lý đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="bill" icon={<BarcodeOutlined />}>
          <Link to="/?tab=bill">Quản lý hóa đơn</Link>
        </Menu.Item>
        <Menu.Item key="receipt" icon={<ImportOutlined />}>
          <Link to="/?tab=receipt">Quản lý phiếu nhập</Link>
        </Menu.Item>
        <Menu.Item key="review" icon={<CommentOutlined />}>
          <Link to="/?tab=review">Quản lý bình luận</Link>
        </Menu.Item>
        <Menu.Item key="blog" icon={<HighlightOutlined />}>
          <Link to="/?tab=blog">Quản lý bài đăng</Link>
        </Menu.Item>
        <Menu.Item key="discountOffer" icon={<DollarCircleOutlined />}>
          <Link to="/?tab=discountOffer">Quản lý khuyến mãi</Link>
        </Menu.Item>
        <Menu.Item key="contacts" icon={<ContactsOutlined />}>
          <Link to="/?tab=contacts">Quản lý contact</Link>
        </Menu.Item>
        {user && user.role === 0 && (
          <Menu.Item key="statistical" icon={<BarChartOutlined />}>
            <Link to="/?tab=statistical">Thống kê</Link>
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
