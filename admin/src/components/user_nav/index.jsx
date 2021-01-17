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
            <Link
              className='navbar__user--action-link-item name'
              to='/?tab=info'
            >
              {'@ ' + user.name}
            </Link>
          </li>
          <div className='navbar__separate'></div>
          <li>
            <Link className='navbar__user--action-link-item' to='/?tab=info'>
              Tài khoản
            </Link>
          </li>
          <div className='navbar__separate'></div>
          <li>
            <Link className='navbar__user--action-link-item' to='/signout'>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
      <div className='navbar__user--action-connect'></div>
      <span className='navbar__user--role'>
        {user.role === 1 ? 'Nhân viên' : 'Quản trị'}
      </span>
      <img src={user.avatar} alt='' className='navbar__user--avt' />
    </Fragment>
  );
};
