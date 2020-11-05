import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Cart, Mail, Phone, Twitter, Facebook, Instagram } from '../../icons';
import './styles.css';
const { Header } = Layout;

export const Navbar = () => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    let count = document.getElementById('cart__count');
    if (localCart) {
      count.textContent = localCart.length;
    } else {
      count.textContent = 0;
    }
  }, [check]);
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
          <Link className='navbar__wrap-actions--link' to='/about'>
            Về chúng tôi
          </Link>
          <Link className='navbar__wrap-actions--link' to='/services'>
            Dịch vụ
          </Link>
          <Link className='navbar__wrap-actions--link' to='/pets'>
            Thú cưng
          </Link>
          <div className='cart'>
            <Link onClick={() => setCheck(!check)} to='/cart'>
              <Cart />
            </Link>
            <span id='cart__count' className='cart__count'>
              {0}
            </span>
          </div>
        </div>
      </section>
    </Header>
  );
};
