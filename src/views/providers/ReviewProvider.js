import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReviewContext } from '../context';
import productReviewAction from '../../stores/productReview/ProductReviewAction';

const { Provider } = ReviewContext;
const ReviewProvider = ({ children, defaultItem, product }) => {
  const [stateForm, setStateForm] = useState({ review: defaultItem, product });
  console.log(stateForm);
  const dispatch = useDispatch();

  const handleInputChangeStateForm = ({ value, name }) => setStateForm({ ...stateForm, [name]: value });

  const handleInputChangeReview = ({ value, name }) =>
    handleInputChangeStateForm({ name: 'review', value: { ...stateForm.review, [name]: value } });

  const handleInputChangeProduct = ({ value, name }) =>
    handleInputChangeStateForm({ name: 'product', value: { ...stateForm.product, [name]: value } });

  const getReviewToStore = () => {
    let review = { ...stateForm.review };
    let product = { ...stateForm.product, productDescription: review.productDescription };
    return { ...review, product };
  };

  const handleReviewUpdate = () => {
    const reviewToStore = getReviewToStore();
    dispatch(productReviewAction.updateProductReview(reviewToStore));
  };
  const value = {
    stateForm,
    handleInputChangeReview,
    handleInputChangeProduct,
    handleReviewUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ReviewProvider;
