import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CartImage from '../images/shopping-cart.png';
import CardProduct from '../components/CardProduct';
import cartQuantityDisplay from '../utils/cartQuantityDisplay';

class Home extends Component {
  state = {
    category: [],
    valueInput: '',
    products: [],
    cart: [],
  };

  async componentDidMount() {
    const test = await getCategories();
    this.setState({
      category: test,
    });
    if (!JSON.parse(localStorage.getItem('cart'))) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    const carts = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cart: carts,
    });
  }

  setCategory = async ({ target }) => {
    const { id } = target;
    const response = await getProductsFromCategoryAndQuery(id);
    const { results } = response;
    this.setState({
      products: results,
    });
  };

  sendingInput = ({ target }) => {
    const { value } = target;
    this.setState({ valueInput: value });
  };

  sendingButton = async () => {
    const { valueInput } = this.state;
    const response = await getProductsFromCategoryAndQuery('', valueInput);
    const { results } = response;
    this.setState({ products: results });
  };

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
      this.setState(
        { cart: newCart },
        () => localStorage.setItem('cart', JSON.stringify(newCart)),
      );

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
    const { category, valueInput, products, cart } = this.state;
    return (
      <>
        <div className="selection-category">
          {
            category.map((element) => (
              <label
                htmlFor={ element.id }
                className="category-radio-label"
                key={ element.id }
              >
                <input
                  className="category-radio"
                  name="category"
                  data-testid="category"
                  type="radio"
                  onClick={ this.setCategory }
                  id={ element.id }
                />
                {element.name}
              </label>
            ))
          }
        </div>
        <div className="nav-bar">
          <label htmlFor="category-input">
            <input
              name="product"
              data-testid="query-input"
              type="text"
              value={ valueInput }
              onChange={ this.sendingInput }
              className="category-input"
              id="category-input"
              placeholder="procurar"
            />
          </label>
          <span>
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.sendingButton }
            >
              Pesquisar
            </button>
          </span>
          <div
            data-testid="home-initial-message"
            className="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
          <section>
            { products.length !== 0
              ? products.map((element) => (
                <CardProduct
                  key={ element.id }
                  title={ element.title }
                  price={ element.price }
                  thumbnail={ element.thumbnail }
                  id={ element.id }
                  handleClick={ this.handleClick }
                  availableQuantity={ element.available_quantity }
                  freeShipping={ element.shipping.free_shipping }
                />
              ))
              : <p>Nenhum produto foi encontrado</p>}

          </section>

        </div>

        <Link data-testid="shopping-cart-button" to="/cart">
          <img
            src={ CartImage }
            alt="Carrinho de Compras"
            className="cart-Icon"
          />
          <div data-testid="shopping-cart-size">{cartQuantityDisplay(cart)}</div>
        </Link>

      </>

    );
  }
}

export default Home;
