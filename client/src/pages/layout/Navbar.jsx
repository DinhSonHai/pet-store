/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { Mail, Phone, Twitter, Facebook, Instagram } from '../../icons';
import { CartAction } from '../../components';
import api from '../../api';
import { getProductsByType } from '../../redux/actions/products';
import { connect } from 'react-redux';
import './styles.scss';

const { Header } = Layout;
const { SubMenu } = Menu;

const NavBar = ({ getProductsByType }) => {
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
                    onClick={() => getProductsByType(ty._id)}
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
  return (
    <Header className='navbar'>
      <div className='navbar__info'>
        <div className='navbar__info-wrap'>
          <div className='navbar__info-contact'>
            <div className='navbar__info-contact--mail'>
              <Mail />
              <span>ducdao0906@gmail.com</span>
            </div>
            <div className='navbar__info-contact--phone'>
              <Phone />
              <span> + 385-639-830</span>
            </div>
          </div>
          <div className='navbar__info-social'>
            <a href='/'>
              <Twitter />
            </a>
            <a href='/'>
              <Facebook />
            </a>
            <a href='/'>
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <section className='navbar__wrap'>
        <div className='logo'>
          <Link to='/'>
            <h1>PetStore</h1>
          </Link>
        </div>
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
          <CartAction />
        </div>
      </section>
    </Header>
  );
};

NavBar.propTypes = {
  getProductsByType: PropTypes.func.isRequired,
};

export default connect(null, { getProductsByType })(NavBar);
