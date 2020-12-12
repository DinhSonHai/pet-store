/* eslint-disable import/no-anonymous-default-export */
import { Row, Col } from 'antd';
import { ProfileSide } from '../../../components';
import { connect } from 'react-redux';
import './styles.scss';
const Profile = ({ children, checkPage, auth: { user } }) => {
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
              <ProfileSide checkPage={checkPage} />
            </Col>
            <Col className='profile__main' xs={24} sm={24} md={18} lg={18}>
              {children}
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
