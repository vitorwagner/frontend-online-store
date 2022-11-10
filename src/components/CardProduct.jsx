import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `products/${id}` }>
        <div data-testid="product">
          <p>{title}</p>
          <img src={ thumbnail } alt={ title } />
          <p>{ price }</p>
        </div>
      </Link>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardProduct;
