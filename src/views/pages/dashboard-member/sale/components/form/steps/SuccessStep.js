import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import SaleAction from '../../../../../../../stores/sale/SaleAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(() => [SaleAction.REQUEST_SALE_CREATE, SaleAction.REQUEST_SALE_UPDATE], []);
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Sale.root()}
      description="Ir a ventas"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
