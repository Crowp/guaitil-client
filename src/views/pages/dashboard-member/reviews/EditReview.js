import React from 'react';
import { RouteMap } from '../../../../constants';
import useReviewByIdEffect from '../../../hooks/useReviewByIdEffect';
import useErrorRedirect from '../../../hooks/useErrorRedirect';
import FormReviewContainer from './components/FormReviewContainer';
import { useParams } from 'react-router';

import { useProductByProductDescriptionId } from '../../../hooks';

const EditReview = () => {
  const { id } = useParams();

  const { isRequesting: isRequestingReview, review, hasErrors: hasErrorsReview } = useReviewByIdEffect(id);
  const { isRequesting: isRequestingProduct, product, hasErrors: hasErrorsProduct } = useProductByProductDescriptionId(
    review.productDescription?.id
  );
  const validatetionError = (hasErrorsReview || hasErrorsProduct) && (!isRequestingReview || !isRequestingProduct);
  useErrorRedirect(RouteMap.Reviews.root(), validatetionError);
  const isEmptyObject = !Object.keys(review).length || !Object.keys(product).length;
  return (
    <FormReviewContainer
      defaultItem={review}
      product={product}
      isLoading={isRequestingReview || isRequestingProduct || isEmptyObject}
    />
  );
};

export default React.memo(EditReview);
