import React, { Component } from 'react';
import PropTypes from 'prop-types';

const STAR_1 = 1;
const STAR_2 = 2;
const STAR_3 = 3;
const STAR_4 = 4;
const STAR_5 = 5;

export class ProductReview extends Component {
  state = {
    email: '',
    rating: '',
    comment: '',
    isInvalid: false,
    reviews: [],
  };

  componentDidMount() {
    const responseTime = 500;

    setTimeout(() => {
      const { id } = this.props;
      const response = localStorage.getItem(id);
      const savedReviews = JSON.parse(response);

      this.setState((prevState) => ({
        reviews: [...prevState.reviews, savedReviews],
      }));
    }, responseTime);
  }

  validateForm = () => {
    const { email, rating } = this.state;
    const emailCheck = email.length > 0;
    const ratingCheck = rating.length > 0;

    return (emailCheck && ratingCheck);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props;

    if (this.validateForm()) {
      const response = JSON.parse(localStorage.getItem(id));
      if (response === null) {
        localStorage.setItem(id, JSON.stringify([this.state]));
      } else {
        localStorage.setItem(id, JSON.stringify([...response, this.state]));
      }
      this.setState({
        email: '',
        rating: '',
        comment: '',
        isInvalid: false,
      });
    } else {
      this.setState({
        isInvalid: true,
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const stars = [STAR_1, STAR_2, STAR_3, STAR_4, STAR_5];
    const { id } = this.props;
    const {
      email,
      comment,
      isInvalid,
    } = this.state;
    const reviews = JSON.parse(localStorage.getItem(id));

    return (
      <>
        <form>
          Avaliações
          <div>
            <input
              type="email"
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            {
              stars.map((star) => (
                <input
                  type="radio"
                  data-testid={ `${star}-rating` }
                  name="rating"
                  onChange={ this.handleChange }
                  value={ star }
                  key={ star }
                />
              ))
            }
            <input
              type="textarea"
              data-testid="product-detail-evaluation"
              name="comment"
              value={ comment }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.handleSubmit }
            >
              Avaliar
            </button>
          </div>
        </form>
        { isInvalid && <p data-testid="error-msg">Campos inválidos</p> }
        <div>
          { (reviews)
            && reviews.map((review) => (
              <div key={ `${review.email}-${review.rating}-${review.comment}` }>
                <div data-testid="review-card-email">
                  { review.email }
                </div>
                <span data-testid="review-card-rating">
                  { review.rating }
                </span>
                <span data-testid="review-card-evaluation">
                  { review.comment }
                </span>
              </div>
            ))}
        </div>
      </>
    );
  }
}

ProductReview.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductReview;
