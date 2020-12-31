/* eslint-disable import/no-anonymous-default-export */
import { ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.scss';
const CartAction = ({ cartState }) => {
  return (
    <div className='navbar__wrap-actions--cart'>
      <Link to='/cart'>
        <ShoppingOutlined style={{ fontSize: '2rem' }} />
        <span id='cart__count' className='cart__count'>
          {!cartState || cartState.length <= 0 ? 0 : cartState.length}
        </span>
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cartState: state.cart.cartState,
});
export default connect(mapStateToProps, {})(CartAction);
