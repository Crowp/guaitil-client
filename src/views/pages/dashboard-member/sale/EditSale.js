import React from 'react';
import { useParams } from 'react-router';
import { RouteMap } from '../../../../constants';
import { useErrorRedirect, useSaleByIdEffect } from '../../../hooks';
import FormSaleContainer from './components/FormSaleContainer';

const EditSale = () => {
  const { id } = useParams();
  const { isRequesting: isSaleRequesting, sale, hasErrors: hasSalesErrors } = useSaleByIdEffect(id);

  const validatetionError = hasSalesErrors && !isSaleRequesting;
  useErrorRedirect(RouteMap.Sale.root(), validatetionError);
  const isEmptyObject = !Object.keys(sale).length;
  return <FormSaleContainer defaultItem={sale} isLoading={isSaleRequesting || isEmptyObject} />;
};

export default React.memo(EditSale);
