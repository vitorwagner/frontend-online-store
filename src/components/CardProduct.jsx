import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { title, thumbnail, price } = this.props;
    return (
      <div data-testid="product">
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardProduct;
