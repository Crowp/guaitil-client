import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ProductReviewAction from '../../stores/productReview/ProductReviewAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useReviewState from './useReviewState';

const useReviewsAuth = selector => {
  const dispatch = useDispatch();
  const reviews = useReviewState(selector);

  const isRequesting = useIsRequesting([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH]);
  const hasErrors = useHasErrors([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH]);

  useEffect(() => {
    dispatch(ProductReviewAction.getProductReviewsByAuth());
  }, [dispatch]);

  return { isRequesting, hasErrors, reviews };
};

export default useReviewsAuth;
