import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProduct } from '../services/api';
import CartImage from '../images/shopping-cart.png';
import { ProductReview } from '../components/ProductReview';
import cartQuantityDisplay from '../utils/cartQuantityDisplay';

export default class ProductDetails extends Component {
  state = {
    product: {},
    cart: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const carts = JSON.parse(localStorage.getItem('cart')) || [];
    const response = await getProduct(id);
    this.setState({
      product: response,
      cart: carts,
    });
  }

  handleClick = ({ title, thumbnail, price, id, availableQuantity }) => {
    const cartObject = {
      title,
      thumbnail,
      price,
      id,
      availableQuantity,
      quantity: 1,
    };
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartStorage.some((element) => element.id === id)) {
      const newCart = cartStorage.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            quantity: element.quantity + 1,
          };
        }
        return element;
      });
      localStorage.setItem('cart', JSON.stringify(newCart));
      return;
    }
    this.setState((prevState) => ({
      cart: [...prevState.cart, cartObject],
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
          <div data-testid="shopping-cart-size">{cartQuantityDisplay(cart)}</div>
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
            Especifica????es t??cnicas:
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
              this.handleClick({
                title: product.title,
                thumbnail: product.thumbnail,
                price: product.price,
                id: product.id,
                availableQuantity: product.available_quantity,
              })) }

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
