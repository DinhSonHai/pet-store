/* eslint-disable import/no-anonymous-default-export */
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import './styles.scss';
export default ({ user }) => {
  return (
    <Fragment>
      <div className='navbar__user--action'>
        <ul className='navbar__user--action-link'>
          <li>
            <Link className='navbar__user--action-link-item name' to='/profile'>
              {'@ ' + user.name}
            </Link>
          </li>
          <div className='navbar__separate'></div>
          <li>
            <Link className='navbar__user--action-link-item' to='/profile'>
              Tài khoản
            </Link>
          </li>
          <li>
            <Link className='navbar__user--action-link-item' to='/orders'>
              Đơn hàng
            </Link>
          </li>
          <li>
            <Link className='navbar__user--action-link-item' to='/wishlist'>
              Ưa thích
            </Link>
          </li>
          <div className='navbar__separate'></div>
          <li>
            <Link className='navbar__user--action-link-item' to='/signout'>
              <span>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar__user--action-connect'></div>
      <img src={user.avatar} alt='' className='navbar__user--avt' />
    </Fragment>
  );
};
