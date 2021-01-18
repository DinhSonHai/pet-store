/* eslint-disable import/no-anonymous-default-export */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { CartAction, UserNav, Loader } from '../../components';
import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';
import './styles.scss';
import { withRouter } from 'react-router-dom';

const { Search } = Input;

const NavBar = ({ auth: { isAuthenticated, user, loading }, history }) => {
  const onSearch = (value) => {
    history.push(`/pets/search?q=${value}`);
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
            {loading ? (
              <Loader className={''} />
            ) : !isAuthenticated ? (
              <Fragment>
                <Link to='/signin'>Đăng nhập</Link>
                <Link to='/signup'>Đăng ký</Link>
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
