import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CartImage from '../images/shopping-cart.png';
import CardProduct from '../components/CardProduct';

class Home extends Component {
  state = {
    category: [],
    valueInput: '',
    products: [],
  };

  async componentDidMount() {
    const test = await getCategories();
    this.setState({
      category: test,
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
    console.log(results);
  };

  render() {
    const { category, valueInput, products } = this.state;
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
        <div>
          <label htmlFor="category-input">
            <input
              name="product"
              data-testid="query-input"
              type="text"
              value={ valueInput }
              onChange={ this.sendingInput }
              className="category-input"
              id="category-input"
            />
          </label>
          <div
            data-testid="home-initial-message"
            className="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        </div>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.sendingButton }
        >
          Pesquisar
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">
          <img
            src={ CartImage }
            alt="Carrinho de Compras"
            className="cart-Icon"
          />
        </Link>
        <section>
          { products.length !== 0
            ? products.map((element) => (
              <CardProduct
                key={ element.id }
                title={ element.title }
                price={ element.price }
                thumbnail={ element.thumbnail }
              />
            ))
            : <p>Nenhum produto foi encontrado</p>}

        </section>
      </>

    );
  }
}

export default Home;
