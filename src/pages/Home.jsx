import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CartImage from '../images/shopping-cart.png';

class Home extends Component {
  state = {
    category: [],
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

  render() {
    const { category } = this.state;
    return (
      <>
        <div data-testid="home-initial-message">
          {
            category.map((element) => (
              <label
                htmlFor="a"
                key={ element.id }
              >
                <input
                  data-testid="category"
                  type="radio"
                  onClick={ this.setCategory }
                  id={ element.id }
                />

                {element.name}

              </label>
            ))
          }
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
