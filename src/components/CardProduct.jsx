import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  render() {
    const { title, thumbnail, price, id, handleClick } = this.props;
    return (
      <div className="card-product">
        <Link data-testid="product-detail-link" to={ `products/${id}` }>
          <div data-testid="product" className="product-details">
            <div className="product-title">
              <span>{title}</span>
              <span>{ price }</span>
            </div>

            <img src={ thumbnail } alt={ title } />

          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => handleClick(title, thumbnail, price) }
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
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CardProduct;
