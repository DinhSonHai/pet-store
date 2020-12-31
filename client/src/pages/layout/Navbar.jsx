/* eslint-disable import/no-anonymous-default-export */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { CartAction, UserNav, Loader } from '../../components';
import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';
import './styles.scss';

const { Search } = Input;

const NavBar = ({ auth: { isAuthenticated, user, loading } }) => {
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
            {loading ? (
              <Loader className={''} />
            ) : !isAuthenticated ? (
              <Fragment>
                <Link to='/signin'>Đăng nhập</Link>
                <Link to='/signup'>Đăng kí</Link>
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
            to={`/pets/all_types/5f9d1f0f92c1c0b400863677`}
          >
            Chó cảnh
          </Link>
          <Link className='navbar__wrap-actions--link' to='/'>
            Mèo cảnh
          </Link>
          <Link className='navbar__wrap-actions--link' to='/'>
            Thức ăn
          </Link>
          <Link className='navbar__wrap-actions--link' to='/'>
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
export default connect(mapStateToProps, { getProductsByType })(NavBar);
