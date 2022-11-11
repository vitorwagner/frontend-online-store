import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../images/shopping-cart.png';

export default class ProductDetails extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProduct(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img
            src={ CartImage }
            alt="Carrinho de Compras"
            className="cart-Icon"
          />
        </Link>
        <div>
          <p data-testid="product-detail-name">
            {`${product.title}`}
          </p>
          <p data-testid="product-detail-price">
            {`R$ ${product.price}`}
          </p>
        </div>
        <div>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <div>
            Especificações técnicas:
            <ul>
              Quantidade:
              {product.initial_quantity }
              <li>{ product.warranty }</li>
              <li>{ product.condition }</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};