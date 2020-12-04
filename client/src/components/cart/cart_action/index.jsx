/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import { Cart } from '../../../icons';
import { Link } from 'react-router-dom';
import './styles.scss';
export default () => {
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
    <div className='navbar__wrap-actions--cart'>
      <Link onClick={() => setCheck(!check)} to='/cart'>
        <Cart />
      </Link>
      <span id='cart__count' className='cart__count'>
        {0}
      </span>
    </div>
  );
};
