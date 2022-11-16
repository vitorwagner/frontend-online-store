import React, { Component } from 'react';

class checkout extends Component {
  state = {
    localS: JSON.parse(localStorage.getItem('cart')),
  };

  render() {
    const { localS } = this.state;

    return (
      <div>
        {(localS !== null && localS.length !== 0)
          ? localS.map((element) => (
            <div key={ element.title }>
              <p data-testid="shopping-cart-product-name">{element.title}</p>
              <img src={ element.thumbnail } alt={ element.title } />
              <p>{ element.price}</p>
              <p data-testid="shopping-cart-product-quantity">{ element.quantity }</p>
            </div>
          ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <section>
          <form>
            <label htmlFor="a">
              <input
                name="Nome"
                type="text"
                data-testid="checkout-fullname"
              />
            </label>
            <label htmlFor="a">
              <input
                name="Email"
                type="text"
                data-testid="checkout-email"
              />
            </label>
            <label htmlFor="a">
              <input
                name="CPF"
                type="text"
                data-testid="checkout-cpf"
              />
            </label>
            <label htmlFor="a">
              <input
                name="Telefone"
                type="text"
                data-testid="checkout-phone"
              />
            </label>
            <label htmlFor="a">
              <input
                name="CEP"
                type="text"
                data-testid="checkout-cep"
              />
            </label>
            <label htmlFor="a">
              <input
                name="Endereço"
                type="text"
                data-testid="checkout-address"
              />
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                type="radio"
                data-testid="ticket-payment"
              />
              Boleto
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                type="radio"
                data-testid="visa-payment"
              />
              Visa
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                type="radio"
                data-testid="master-payment"
              />
              MasterCard
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                type="radio"
                data-testid="elo-payment"
              />
              Elo
            </label>
            <button
              type="submit"
              data-testid="checkout-products"
            >
              Compra
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default checkout;
