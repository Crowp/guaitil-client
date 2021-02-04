import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import ProductAction from '../../../../../../../stores/product/ProductAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title, idLocal }) => {
  const actionTypes = useMemo(() => [ProductAction.REQUEST_PRODUCT_CREATE, ProductAction.REQUEST_PRODUCT_UPDATE], []);
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Product.individualLocalRoot(idLocal)}
      description="Ir al local"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
