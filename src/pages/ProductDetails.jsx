import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../images/shopping-cart.png';
import { ProductReview } from '../components/ProductReview';

export default class ProductDetails extends Component {
  state = {
    product: {},
    cart: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const carts = JSON.parse(localStorage.getItem('cart'));
    const response = await getProduct(id);
    this.setState({
      product: response,
      cart: carts,
    });
  }

  handleClick = (cartTitle, cartThumbnail, cartPrice, productId) => {
    const carts = JSON.parse(localStorage.getItem('cart'));

    const cartObject = {
      title: cartTitle,
      thumbnail: cartThumbnail,
      price: cartPrice,
      idProduct: productId,
      quantity: 1,
    };
    this.setState(({ cart: [...carts, cartObject],
    }), () => {
      const { cart } = this.state;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  };

  render() {
    const { product, cart } = this.state;

    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img
            src={ CartImage }
            alt="Carrinho de Compras"
            className="cart-Icon"
          />
          <div data-testid="shopping-cart-size">{cart.length}</div>
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
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => (
              this.handleClick(product.title, product.thumbnail, product.price)) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <ProductReview
          id={ product.id }
        />
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
