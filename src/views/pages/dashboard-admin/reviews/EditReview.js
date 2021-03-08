import React from 'react';
import { RouteMap } from '../../../../constants';
import useReviewByIdEffect from '../../../hooks/useReviewByIdEffect';
import useErrorRedirect from '../../../hooks/useErrorRedirect';
import FormReviewContainer from './components/FormReviewContainer';

import { useProductByProductDescriptionId } from '../../../hooks';

const EditReview = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting: isRequestingReview, review, hasErrors: hasErrorsReview } = useReviewByIdEffect(id);
  const { isRequesting: isRequestingProduct, product, hasErrors: hasErrorsProduct } = useProductByProductDescriptionId(
    review.productDescription?.id
  );
  const validatetionError = (hasErrorsReview || hasErrorsProduct) && (!isRequestingReview || !isRequestingProduct);
  useErrorRedirect(RouteMap.Reservation.root(), validatetionError);
  const isEmptyObject = !Object.keys(review).length && !Object.keys(product);
  return <FormReviewContainer defaultItem={review} product={product} isLoading={isRequestingReview || isEmptyObject} />;
};

export default React.memo(EditReview);
