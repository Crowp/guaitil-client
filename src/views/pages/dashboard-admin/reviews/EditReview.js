import React from 'react';
import { RouteMap } from '../../../../constants';
import useReviewByIdEffect from '../../../hooks/useReviewByIdEffect';
import useErrorRedirect from '../../../hooks/useErrorRedirect';
import FormReviewContainer from './components/FormReviewContainer';

const EditReview = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting, review, hasErrors } = useReviewByIdEffect(id);
  const validatetionError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.Reservation.root(), validatetionError);
  const isEmptyObject = !Object.keys(review).length;
  return <FormReviewContainer defaultItem={review} isLoading={isRequesting || isEmptyObject} />;
};

export default React.memo(EditReview);
