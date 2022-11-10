import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const cart = JSON.parse(localStorage.getItem('cart'));

    return (
      <>
        {cart.map((element) => (
          <div key={ element.title }>
            <p data-testid="shopping-cart-product-name">{element.title}</p>
            <img src={ element.thumbnail } alt={ element.title } />
            <p>{ element.price}</p>
            <p data-testid="shopping-cart-product-quantity">1</p>
          </div>
        ))}
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </>
    );
  }
}

export default Cart;
