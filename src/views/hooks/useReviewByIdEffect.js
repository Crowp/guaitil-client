import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ProductReviewAction from '../../stores/productReview/ProductReviewAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useReviewState from './useReviewState';

const useReviewByIdEffect = id => {
  const dispatch = useDispatch();
  const [review, setReview] = useState({});
  const [load, setLoad] = useState(false);
  const reviews = useReviewState();

  const isRequesting = useIsRequesting([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID]);
  const hasErrors = useHasErrors([ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(reviews) && id) {
      const [reviewFounded = {}] = reviews.filter(item => item.id === Number(id));
      if (reviewFounded) {
        setReview(reviewFounded);
      }
    } else if (!load && id) {
      dispatch(ProductReviewAction.getProductReviewById(id));
      setLoad(true);
    }
  }, [dispatch, id, reviews, load]);

  return { isRequesting, review, hasErrors, reviews };
};

export default useReviewByIdEffect;
