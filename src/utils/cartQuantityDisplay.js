function cartQuantityDisplay(cart = []) {
  return cart.reduce((acc, { quantity }) => acc + quantity, 0);
}

export default cartQuantityDisplay;
