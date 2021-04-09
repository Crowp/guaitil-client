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
      redirectUrl={RouteMap.LocalMember.root()}
      description="Ir a mis locales"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
