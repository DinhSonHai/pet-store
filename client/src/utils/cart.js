export const addItem = (item) => {
  let count = document.getElementById('cart__count');
  let cartCopy = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cartCopy.find((cartItem) => cartItem._id === item._id);
  if (existingItem) {
    existingItem.amount += 1;
  } else {
    item.amount = 1;
    let { _id, amount, productName, images, price } = item;
    cartCopy.push({ _id, amount, productName, image: images[0], price });
  }
  localStorage.setItem('cart', JSON.stringify(cartCopy));
  count.textContent = cartCopy.length;
};
