/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ProfileSide } from '../../components';
import { ProfileInfo, ProfileAddress, ProfileWishlist } from '../../components';
import { connect } from 'react-redux';
import queryString from 'query-string';
import './styles.scss';
const Profile = ({ location, auth: { user } }) => {
  let tab = queryString.parse(location.search).tab || 'info';
  const [tabState, setTabState] = useState(tab);
  useEffect(() => {
    setTabState(tab);
  }, [tab]);
  return (
    <section className='profile'>
      <div className='profile__wrap container'>
        <div className='profile__content'>
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
