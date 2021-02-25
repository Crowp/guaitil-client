import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductReviewAction from '../../stores/productReview/ProductReviewAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useReviewState from './useReviewState';

const useReviewEffect = (selector = state => state.productReviews) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ProductReviewAction.REQUEST_PRODUCT_REVIEW]);
  const items = useReviewState(selector);
  const hasErrors = useHasErrors([ProductReviewAction.REQUEST_PRODUCT_REVIEW_FINISHED]);
  useEffect(() => {
    dispatch(ProductReviewAction.getProductReviews());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useReviewEffect;
