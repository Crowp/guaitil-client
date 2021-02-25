import React, { useState, useEffect } from 'react';
import { ReviewContext } from '../context';
import ProductReviewModel from '../../models/ProductReviewModel';
import { useDispatch } from 'react-redux';
import productReviewAction from '../../stores/productReview/ProductReviewAction';

const { Provider } = ReviewContext;
const ReviewProvider = ({ children, defaultItem }) => {
  console.log(defaultItem);
  const [review, setReview] = useState(defaultItem || { ...new ProductReviewModel() });

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setReview(defaultItem);
    }
  }, [defaultItem]);

  const handleInputChangeReview = ({ value, name }) => setReview({ ...review, [name]: value });

  const handleReviewCreate = () => {
    dispatch(productReviewAction.createProductReview(review));
  };

  const handleReviewUpdate = () => {
    dispatch(productReviewAction.updateProductReview(review));
  };
  const value = {
    review,
    setReview,
    handleInputChangeReview,
    handleReviewUpdate,
    handleReviewCreate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ReviewProvider;
