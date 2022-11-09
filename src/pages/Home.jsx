import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../images/shopping-cart.png';

class Home extends Component {
  render() {
    return (
      <>
        <div data-testid="home-initial-message">
          <label htmlFor="a">
            <input
              type="text"
            />
          </label>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img src={ CartImage } alt="Carrinho de Compras" className="Cart-Icon" />
        </Link>
      </>

    );
  }
}

export default Home;
