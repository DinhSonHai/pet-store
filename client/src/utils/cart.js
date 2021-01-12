import store from '../store';
import { UPDATE_CART, REMOVE_CART } from '../redux/types';
import { message } from 'antd';
export const addItem = (item) => {
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartCopy.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    existingItem.amount += 1;
    if (existingItem.amount === 101) {
      message.error('Số lượng phải nhỏ hơn 100!');
      return false;
    }
  } else {
    item.amount = 1;
    let { _id, amount, productName, images, price } = item;
    cartCopy.push({ _id, amount, productName, image: images[0], price });
  }
  store.dispatch({
    type: UPDATE_CART,
    payload: { isHaveCart: true, cartState: cartCopy },
  });
  localStorage.setItem('cart', JSON.stringify(cartCopy));
  return true;
};

export const removeItem = (_id) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let updatedCart = cart.filter((item) => {
    return item._id !== _id;
  });
  if (updatedCart.length <= 0) {
    store.dispatch({
      type: REMOVE_CART,
    });
  } else {
    store.dispatch({
      type: UPDATE_CART,
      payload: {
        isHaveCart: true,
        cartState: updatedCart,
      },
    });
  }
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const setAmount = (_id, value) => {
  if (!value || isNaN(value) || !Number.isInteger(value)) {
    return message.error('Số lượng không hợp lệ!');
  }
  if (value > 100) {
    return message.error('Số lượng phải nhỏ hơn 100!');
  }
  let cart = JSON.parse(localStorage.getItem('cart'));
  let updatedCart = cart.map((item) => {
    return item._id === _id ? { ...item, amount: value } : item;
  });
  store.dispatch({
    type: UPDATE_CART,
    payload: { isHaveCart: true, cartState: updatedCart },
  });
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
