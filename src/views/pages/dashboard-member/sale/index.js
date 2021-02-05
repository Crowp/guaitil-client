import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import SaleTable from './SaleTable';
import { selectSales } from '../../../../selectors/sale/SaleSelector';
import Loader from '@/template/components/common/Loader';
import { RouteMap } from '../../../../constants';
import { useSalesEffect } from '../../../hooks';

const SaleManagment = () => {
  const history = useHistory();
  const { isRequesting, items: sales } = useSalesEffect(selectSales);
  return isRequesting ? (
    <Loader />
  ) : isIterableArray(sales) ? (
    <SaleTable sales={sales} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Sale.create())}
      actionName="Registra una venta"
      title="Administración de ventas"
      description="No hay ventas registradas aún!"
    />
  );
};

export default React.memo(SaleManagment);
