import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { title, thumbnail, price, handleClick } = this.props;
    return (
      <div data-testid="product">
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ handleClick() }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardProduct;
