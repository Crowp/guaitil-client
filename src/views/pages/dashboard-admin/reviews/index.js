import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import Loader from '@/template/components/common/Loader';
import useReviewEffect from '../../../hooks/useReviewEffect';
import ReviewsAdminTable from './ReviewsAdminTable';
import { selectAllreviews } from '../../../../selectors/productReview/ProductReviewSelector';

const ReviewsManagment = () => {
  const history = useHistory();
  const { isRequesting, items: reviews } = useReviewEffect(selectAllreviews);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(reviews) ? (
    <ReviewsAdminTable reviews={reviews} />
  ) : (
    <Starter
      action={() => history.push('admin/dashboard')}
      actionName="Ir al dashboard"
      title="Administración de revisiones"
      description="No hay revisiones!"
    />
  );
};

export default React.memo(ReviewsManagment);
