import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../components/extra/Starter';
import { isIterableArray } from '../../../template/helpers/utils';
import SaleTable from './SaleTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectSales } from '../../../selectors/sale/SaleSelector';
import { selectRequesting } from '../../../selectors/requesting/RequestingSelector';
import SaleAction from '../../../stores/sale/SaleAction';
import { Col, Row } from 'reactstrap';

const SaleManagment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sales = useSelector(selectSales);
  const isRequesting = useSelector(state => selectRequesting(state, [SaleAction.REQUEST_SALE]));

  useEffect(() => {
    dispatch(SaleAction.getSalesByMemberId());
  }, [dispatch]);

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
      action={() => history.push('/member/sale/create')}
      actionName="Registra una venta"
      title="Administración de ventas"
      description="No hay ventas registradas aún!"
    />
  );
};

export default React.memo(SaleManagment);
