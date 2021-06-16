import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import Loader from '@/template/components/common/Loader';
import ReviewsMemberTable from './ReviewsMemberTable';
import { selectAllreviews } from '../../../../selectors/productReview/ProductReviewSelector';
import { RouteMap } from '../../../../constants';
import useReviewsAuth from '../../../hooks/useReviewsAuth';

const ReviewsManagment = () => {
  const history = useHistory();
  const { isRequesting, items: reviews } = useReviewsAuth(selectAllreviews);
  return isRequesting ? (
    <Loader />
  ) : isIterableArray(reviews) ? (
    <ReviewsMemberTable reviews={reviews} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Dashboard.root())}
      actionName="Ir al dashboard"
      title="Administración de revisiones"
      description="Aún no hay revisiones registradas!"
    />
  );
};

export default React.memo(ReviewsManagment);
