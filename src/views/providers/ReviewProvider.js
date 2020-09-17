import React, { useState, useEffect } from 'react';
import { ReviewContext } from '../context';
import ProductReviewModel from '../../models/ProductReviewModel';

const { Provider } = ReviewContext;
const ReviewProvider = ({ children, defaultReview }) => {
  const [review, setReview] = useState(defaultReview || { ...new ProductReviewModel() });

  useEffect(() => {
    if (defaultReview) {
      setReview(defaultReview);
    }
  }, [defaultReview]);

  const handleInputChangeReview = ({ value, name }) => setReview({ ...review, [name]: value });
  const handleInputChangeProductReview = ({ value, name }) =>
    setReview({ ...review, product: { ...review.product, [name]: value } });
  const value = { review, setReview, handleInputChangeReview, handleInputChangeProductReview };

  return <Provider value={value}>{children}</Provider>;
};

export default ReviewProvider;
