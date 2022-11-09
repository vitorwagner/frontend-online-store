import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
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
