import React, { useState, useEffect } from 'react';
import { ReviewContext } from '../context';
import ProductReviewModel from '../../models/ProductReviewModel';
import { useDispatch } from 'react-redux';
import productReviewAction from '../../stores/productReview/ProductReviewAction';

const { Provider } = ReviewContext;
const ReviewProvider = ({ children, defaultItem, product }) => {
  const [stateForm, setStateForm] = useState(defaultItem || { ...new ProductReviewModel() });

  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setStateForm({ review: defaultItem, product });
    }
  }, [defaultItem, product]);

  const handleInputChangeStateForm = ({ value, name }) => setStateForm({ ...stateForm, [name]: value });

  const handleInputChangeReview = ({ value, name }) =>
    handleInputChangeStateForm({ name: 'review', value: { ...stateForm.review, [name]: value } });

  const handleInputChangeProduct = ({ value, name }) =>
    handleInputChangeStateForm({ name: 'product', value: { ...stateForm.product, [name]: value } });

  const getReviewToStore = () => {
    let product = stateForm.product;
    let review = stateForm.review;

    product.productDescription = review.productDescription;

    return { ...review, product };
  };

  const handleReviewCreate = () => {
    const reviewToStore = getReviewToStore();
    dispatch(productReviewAction.createProductReview(reviewToStore));
  };

  const handleReviewUpdate = () => {
    const reviewToStore = getReviewToStore();
    dispatch(productReviewAction.updateProductReview(reviewToStore));
  };
  const value = {
    stateForm,
    handleInputChangeReview,
    handleInputChangeProduct,
    handleReviewUpdate,
    handleReviewCreate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ReviewProvider;
