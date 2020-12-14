import store from '../store';
import { UPDATE_CART } from '../redux/types';
export const addItem = (item) => {
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartCopy.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    existingItem.amount += 1;
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
};
