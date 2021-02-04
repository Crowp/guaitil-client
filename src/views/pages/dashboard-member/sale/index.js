import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import SaleTable from './SaleTable';
import SaleAction from '../../../../stores/sale/SaleAction';
import { selectSales } from '../../../../selectors/sale/SaleSelector';
import { Col, Row } from 'reactstrap';
import { RouteMap } from '../../../../constants';
import { useSalesEffect } from '../../../hooks';
import { useDispatch } from 'react-redux';

const SaleManagment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isRequesting, items: sales } = useSalesEffect(selectSales);
  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
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
