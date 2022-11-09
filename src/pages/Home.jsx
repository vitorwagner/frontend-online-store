import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    category: [],
  };

  async componentDidMount() {
    const test = await getCategories();
    this.setState({
      category: test,
    });
  }

  render() {
    const { category } = this.state;
    return (
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
    );
  }
}

export default Home;
