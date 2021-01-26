/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react';
import { Row, Col, Select } from 'antd';
import { ProfileSide } from '../../components';
import {
  ProfileInfo,
  ProfileAddress,
  ProfileWishlist,
  ProfileOrder,
  ProfilePurchased,
} from '../../components';
import { connect } from 'react-redux';
import queryString from 'query-string';
import './styles.scss';
const { Option } = Select;
const Profile = ({ location, history, auth: { user } }) => {
  let tab = queryString.parse(location.search).tab || 'info';
  const [tabState, setTabState] = useState(tab);
  useEffect(() => {
    setTabState(tab);
  }, [tab]);
  function handleChange(value) {
    switch (value) {
      case 'info':
        return history.push('/profile/?tab=info');
      case 'address':
        return history.push('/profile/?tab=address');
      case 'wishlist':
        return history.push('/profile/?tab=wishlist');
      case 'orders':
        return history.push('/profile/?tab=orders');
      case 'purchased':
        return history.push('/profile/?tab=purchased');
      default:
        return history.push('/profile/?tab=info');
    }
  }
  return (
    <section className='profile'>
      <div className='profile__wrap container'>
        <div className='profile__content'>
          <div className='profile__select'>
            <Select
              defaultValue={tab}
              style={{ width: '100%' }}
              onChange={handleChange}
            >
              <Option value='info'>Thông tin tài khoản</Option>
              <Option value='orders'>Quản lý đơn hàng</Option>
              <Option value='address'>Sổ địa chỉ</Option>
              <Option value='wishlist'>Sản phẩm ưa thích</Option>
              <Option value='purchased'> Sản phẩm đã mua</Option>
            </Select>
          </div>
          <Row gutter={[16, 16]}>
            <Col className='profile__side' xs={0} sm={0} md={6} lg={6}>
              <div className='profile__info'>
                <img src={user.avatar} alt='Avt' className='profile__avt' />
                <div className='profile__info--wrap'>
                  <p className='profile__desc'>Tài khoản của:</p>
                  <p className='profile__username'>{user.name}</p>
                </div>
              </div>
              <ProfileSide tab={tab} />
            </Col>
            <Col className='profile__main' xs={24} sm={24} md={18} lg={18}>
              {tabState === 'info' ? (
                <ProfileInfo />
              ) : tabState === 'address' ? (
                <ProfileAddress />
              ) : tabState === 'wishlist' ? (
                <ProfileWishlist />
              ) : tabState === 'orders' ? (
                <ProfileOrder />
              ) : tabState === 'purchased' ? (
                <ProfilePurchased />
              ) : (
                !tabState && <ProfileInfo />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Profile);
