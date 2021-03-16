import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import ProductReviewAction from '../../../../../../../stores/productReview/ProductReviewAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(() => [ProductReviewAction.REQUEST_PRODUCT_REVIEW_UPDATE], []);
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.ReviewsMember.root()}
      description="Ir a revisiones"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
