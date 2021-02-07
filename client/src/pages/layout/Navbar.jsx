/* eslint-disable import/no-anonymous-default-export */
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Drawer, Divider, Menu, message } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CartAction, UserNav, Loader } from '../../components';
import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';
import './styles.scss';
import { withRouter } from 'react-router-dom';
const { SubMenu } = Menu;
const { Search } = Input;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const NavBar = ({ auth: { isAuthenticated, user, loading }, history }) => {
  const onSearch = (value) => {
    if (!value) {
      return message.error('Vui lòng nhập nội dung cần tìm!');
    }
    history.push(`/pets/search?q=${value}`);
  };
  const [visible, setVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <section className='navbar'>
      <div className='navbar__info'>
        <div className='navbar__info-wrap'>
          <div className='navbar__info-contact'>
            <Button
              onClick={showDrawer}
              className='menu-responsive'
              icon={<MenuOutlined />}
            />
            <div className='logo'>
              <Link to='/'>
                <h1>PetStore.</h1>
              </Link>
            </div>
            <div className='navbar__search'>
              <Search
                size='large'
                placeholder='Nhập nội dung cần tìm...'
                onSearch={onSearch}
                enterButton={
                  <Button icon={<SearchOutlined />} type='primary'>
                    Tìm kiếm
                  </Button>
                }
              />
            </div>
          </div>
          <div className='navbar__info-social'>
            {loading ? (
              <Loader className={''} />
            ) : !isAuthenticated ? (
              <Fragment>
                <Link className='navbar__info--sign' to='/signin'>
                  Đăng nhập
                </Link>
                <Link className='navbar__info--sign' to='/signup'>
                  Đăng ký
                </Link>
              </Fragment>
            ) : (
              <div className='navbar__user'>
                {!user ? <Loader className={''} /> : <UserNav user={user} />}
              </div>
            )}
            <CartAction />
          </div>
        </div>
      </div>
      <section className='navbar__wrap'>
        <div className='navbar__wrap-actions'>
          <Link className='navbar__wrap-actions--link' to='/'>
            Trang chủ
          </Link>
          <Link
            className='navbar__wrap-actions--link'
            to={`/pets/dog/5f9d1f0f92c1c0b400863677`}
          >
            Chó cảnh
          </Link>
          <Link
            className='navbar__wrap-actions--link'
            to={`/pets/cat/5f9d1f1d92c1c0b400863843`}
          >
            Mèo cảnh
          </Link>
          <Link
            className='navbar__wrap-actions--link'
            to={`/pets/food/5ff00f72488a9a35bcb5d1dc`}
          >
            Thức ăn
          </Link>
          <Link
            className='navbar__wrap-actions--link'
            to={`/pets/accessories/5ff01f04d5b5e035d8ed9f67`}
          >
            Phụ kiện
          </Link>
          <Link className='navbar__wrap-actions--link' to='/about'>
            Về chúng tôi
          </Link>
          <Link className='navbar__wrap-actions--link' to='/services'>
            Dịch vụ
          </Link>
        </div>
      </section>
      <Drawer
        className='menu-showed-responsive'
        placement='right'
        onClose={onClose}
        visible={visible}
      >
        <div className='navbar__search--menu'>
          <Search
            placeholder='Nhập nội dung cần tìm...'
            onSearch={onSearch}
            enterButton
          />
        </div>
        {loading ? (
          <Loader className={''} />
        ) : !isAuthenticated ? (
          <Fragment>
            <Link to='/signin'>Đăng nhập</Link>
            <Link to='/signup'>Đăng ký</Link>
          </Fragment>
        ) : (
          <div className='navbar__user--menu'>
            {!user ? (
              <Loader className={''} />
            ) : (
              <Menu
                style={{ marginTop: '2rem' }}
                mode='inline'
                openKeys={openKeys}
                onOpenChange={onOpenChange}
              >
                <SubMenu
                  key='sub1'
                  title={
                    <img
                      src={user.avatar}
                      alt=''
                      className='navbar__user--avt'
                    />
                  }
                >
                  <Menu.Item key='1'>
                    <Link to='/profile/?tab=info'>{'@ ' + user.name}</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <Link to='/profile/?tab=info'>Tài khoản</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>
                    <Link to='/profile/?tab=orders'>Đơn hàng</Link>
                  </Menu.Item>
                  <Menu.Item key='4'>
                    <Link to='/profile/?tab=wishlist'>Ưa thích</Link>
                  </Menu.Item>
                  <Menu.Item key='5'>
                    <Link to='/signout'>
                      <span>Đăng xuất</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            )}
          </div>
        )}

        <Divider />
        <Link className='navbar__wrap-actions--link' to='/'>
          Trang chủ
        </Link>
        <Link
          className='navbar__wrap-actions--link'
          to={`/pets/dog/5f9d1f0f92c1c0b400863677`}
        >
          Chó cảnh
        </Link>
        <Link
          className='navbar__wrap-actions--link'
          to={`/pets/cat/5f9d1f1d92c1c0b400863843`}
        >
          Mèo cảnh
        </Link>
        <Link
          className='navbar__wrap-actions--link'
          to={`/pets/food/5ff00f72488a9a35bcb5d1dc`}
        >
          Thức ăn
        </Link>
        <Link
          className='navbar__wrap-actions--link'
          to={`/pets/accessories/5ff01f04d5b5e035d8ed9f67`}
        >
          Phụ kiện
        </Link>
        <Link className='navbar__wrap-actions--link' to='/about'>
          Về chúng tôi
        </Link>
        <Link className='navbar__wrap-actions--link' to='/services'>
          Dịch vụ
        </Link>
      </Drawer>
    </section>
  );
};

NavBar.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getProductsByType })(
  withRouter(NavBar)
);
