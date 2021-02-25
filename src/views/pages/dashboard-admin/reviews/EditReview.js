import React from 'react';
import { RouteMap } from '../../../../constants';
import useReviewEffect from '../../../hooks/useReviewEffect';
import useReviewByIdEffect from '../../../hooks/useReviewByIdEffect';
import useErrorRedirect from '../../../hooks/useErrorRedirect';
import FormReviewContainer from './components/form/FormReviewContainer';

const EditReview = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting: isRequestingReview } = useReviewEffect();
  const { isRequesting, review, hasErrors } = useReviewByIdEffect(id);
  const validatetionError = hasErrors && !isRequestingReview;
  useErrorRedirect(RouteMap.Reservation.root(), validatetionError);
  const isEmptyObject = !Object.keys(review).length;
  return <FormReviewContainer defaultItem={review} isLoading={isRequestingReview || isRequesting || isEmptyObject} />;
};

export default React.memo(EditReview);
