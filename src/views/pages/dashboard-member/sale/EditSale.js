import React from 'react';
import { RouteMap } from '../../../../constants';
import { useErrorRedirect, useSaleByIdEffect, useSalesEffect } from '../../../hooks';
import FormSaleContainer from './components/FormSaleContainer';

const EditSale = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting: isRequestingSales } = useSalesEffect();
  const { isRequesting: isSaleRequesting, sale, hasErrors: hasSalesErrors } = useSaleByIdEffect(id);

  const validatetionError = hasSalesErrors && !isSaleRequesting;
  useErrorRedirect(RouteMap.Sale.root(), validatetionError);
  const isEmptyObject = !Object.keys(sale).length;
  return <FormSaleContainer defaultItem={sale} isLoading={isSaleRequesting || isRequestingSales || isEmptyObject} />;
};

export default React.memo(EditSale);
