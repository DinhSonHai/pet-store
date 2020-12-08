/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Input } from 'antd';
import { Link } from 'react-router-dom';
import { CartAction, UserNav } from '../../components';
import api from '../../api';
import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';
import './styles.scss';

const { SubMenu } = Menu;
const { Search } = Input;

const NavBar = ({
  getProductsByType,
  auth: { isAuthenticated, user, loading },
}) => {
  const [types, setTypes] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getMenu = async () => {
      const cat = await api.get('/categories');
      const ty = await api.get('/types');
      setCategory(cat.data);
      setTypes(ty.data);
    };
    getMenu();
  }, []);
  const menu = (
    <Menu>
      {category.map((cat) => {
        return (
          <SubMenu key={cat._id} title={cat.categoryName}>
            {types.map((ty) => {
              return cat._id === ty.categoryId ? (
                <Menu.Item key={ty._id}>
                  <Link
                    className='type__title'
                    onClick={async () => await getProductsByType(ty._id)}
                    to={`/pets/types/${ty._id}`}
                  >
                    {ty.typeName}
                  </Link>
                </Menu.Item>
              ) : null;
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <section className='navbar'>
      <div className='navbar__info'>
        <div className='navbar__info-wrap'>
          <div className='navbar__info-contact'>
            <div className='logo'>
              <Link to='/'>
                <h1>PetStore.</h1>
              </Link>
            </div>
            <div className='navbar__search'>
              <Search
                placeholder='Nhập thú cưng cần tìm...'
                onSearch={onSearch}
                enterButton
              />
            </div>
          </div>
          <div className='navbar__info-social'>
            {loading ? null : !isAuthenticated ? (
              <Fragment>
                <Link to='/signin'>Đăng nhập</Link>
                <Link to='/signup'>Đăng kí</Link>
              </Fragment>
            ) : (
              <div className='navbar__user'>
                {!user ? null : <UserNav user={user} />}
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
          <Dropdown overlay={menu}>
            <div className='navbar__wrap-actions--link'>Thú cưng</div>
          </Dropdown>
          <Link className='navbar__wrap-actions--link' to='/about'>
            Về chúng tôi
          </Link>
          <Link className='navbar__wrap-actions--link' to='/services'>
            Dịch vụ
          </Link>
        </div>
      </section>
    </section>
  );
};

NavBar.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getProductsByType })(NavBar);
