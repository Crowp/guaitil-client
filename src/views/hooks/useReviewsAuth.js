import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ProductReviewAction from '../../stores/productReview/ProductReviewAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useReviewState from './useReviewState';

const useReviewsAuth = selector => {
  const dispatch = useDispatch();
  const reviews = useReviewState(selector);

  const isRequesting = useIsRequesting([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID]);
  const hasErrors = useHasErrors([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID_FINISHED]);

  useEffect(() => {
    dispatch(ProductReviewAction.getProductReviewsByAuth());
  }, [dispatch, reviews]);

  return { isRequesting, hasErrors, reviews };
};

export default useReviewsAuth;
