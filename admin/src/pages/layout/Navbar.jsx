import { connect } from 'react-redux';
import { UserNav, Loader } from '../../components';
import { Layout } from 'antd';
import './styles.scss';
const { Header } = Layout;
const Navbar = ({ auth: { user } }) => {
  return (
    <Header className='site-layout-background' style={{ padding: 0 }}>
      <section className='navbar'>
        <div className='navbar__search'></div>
        <div className='navbar__user'>
          {!user ? <Loader className={''} /> : <UserNav user={user} />}
        </div>
      </section>
    </Header>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(Navbar);
