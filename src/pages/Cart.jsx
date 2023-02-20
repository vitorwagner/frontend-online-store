import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  state = {
    localS: JSON.parse(localStorage.getItem('cart')),
  };

  changeMore = ({ target }) => {
    const { localS } = this.state;

    localS.map((element, index) => {
      if (element.id === target.id) {
        localS[index].quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(localS));
      return this.setState({ localS: JSON.parse(localStorage.getItem('cart')) });
    });
  };

  changeLess = ({ target }) => {
    const { localS } = this.state;

    localS.map((element, index) => {
      if (element.id === target.id && element.quantity > 1) {
        localS[index].quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(localS));
      return this.setState({ localS: JSON.parse(localStorage.getItem('cart')) });
    });
  };

  changeRemove = ({ target }) => {
    const { localS } = this.state;

    localS.map((element, index) => {
      if (element.id === target.id) {
        localS.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(localS));
      return this.setState({ localS: JSON.parse(localStorage.getItem('cart')) });
    });
  };

  cartQuantityCheck = (productId) => {
    const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const cartQuantity = cartStorage.filter((element) => element.id === productId);
    return cartQuantity.length > 0 ? cartQuantity[0].quantity : 0;
  };

  render() {
    const { localS } = this.state;

    return (
      <div>
        {(localS !== null && localS.length !== 0)
          ? localS.map((element) => (
            <div key={ element.title }>
              <p data-testid="shopping-cart-product-name">{element.title}</p>
              <img src={ element.thumbnail } alt={ element.title } />
              <p>{ element.price}</p>
              <p data-testid="shopping-cart-product-quantity">{ element.quantity }</p>
              <button
                type="button"
                id={ element.id }
                data-testid="product-increase-quantity"
                onClick={ this.changeMore }
                disabled={ localS.some((item) => item.id === element.id)
                  ? element.availableQuantity
                  === this.cartQuantityCheck(element.id) : false }
              >
                +
              </button>
              <button
                type="button"
                id={ element.id }
                data-testid="product-decrease-quantity"
                onClick={ this.changeLess }
              >
                -
              </button>
              <button
                type="button"
                id={ element.id }
                data-testid="remove-product"
                onClick={ this.changeRemove }
              >
                Remover
              </button>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <Link to="/checkout">
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar Compra
          </button>
        </Link>
      </div>
    );
  }
}

export default Cart;
