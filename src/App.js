import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/checkout';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/products/:id" component={ ProductDetails } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    </div>
  );
}

export default App;
