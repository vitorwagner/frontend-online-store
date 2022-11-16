import React, { Component } from 'react';

class checkout extends Component {
  state = {
    localS: JSON.parse(localStorage.getItem('cart')),
    errorMessage: false,
    Nome: '',
    Email: '',
    CPF: '',
    Telefone: '',
    CEP: '',
    Endereço: '',
    pagamento: '',
  };

  validateForm = () => {
    const { Nome, Email, CPF, Telefone, CEP, Endereço, pagamento } = this.state;
    const nameCheck = Nome.length > 0;
    const emailCheck = Email.length > 0;
    const cpfCheck = CPF.length > 0;
    const telCheck = Telefone.length > 0;
    const cepCheck = CEP.length > 0;
    const addressCheck = Endereço.length > 0;
    const paymentCheck = pagamento.length > 0;

    return (nameCheck && emailCheck && cpfCheck
      && telCheck && cepCheck && addressCheck && paymentCheck);
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({
        errorMessage: false,
      });
      localStorage.clear();
    } else {
      this.setState({
        errorMessage: true,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { localS, errorMessage } = this.state;

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
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="Email"
                type="text"
                data-testid="checkout-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="CPF"
                type="text"
                data-testid="checkout-cpf"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="Telefone"
                type="text"
                data-testid="checkout-phone"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="CEP"
                type="text"
                data-testid="checkout-cep"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="Endereço"
                type="text"
                data-testid="checkout-address"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                value="boleto"
                type="radio"
                data-testid="ticket-payment"
                onClick={ this.handleChange }
              />
              Boleto
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                value="visa"
                type="radio"
                data-testid="visa-payment"
                onClick={ this.handleChange }
              />
              Visa
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                value="master"
                type="radio"
                data-testid="master-payment"
                onClick={ this.handleChange }
              />
              MasterCard
            </label>
            <label htmlFor="a">
              <input
                name="pagamento"
                value="elo"
                type="radio"
                data-testid="elo-payment"
                onClick={ this.handleChange }
              />
              Elo
            </label>
            <button
              type="submit"
              data-testid="checkout-btn"
              onClick={ this.handleClick }
            >
              Compra
            </button>
          </form>
          { errorMessage ? <p data-testid="error-msg">Campos inválidos</p> : null }
        </section>
      </div>
    );
  }
}

export default checkout;
