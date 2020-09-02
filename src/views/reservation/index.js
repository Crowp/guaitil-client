import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../components/extra/Starter';
import { isIterableArray } from '../../template/helpers/utils';
import ReservationTable from './ReservationTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectReservations } from '../../selectors/reservation/ReservationSelector';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import ReservationAction from '../../stores/reservation/ReservationAction';
import { Col, Row } from 'reactstrap';

const ReservationManagment = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const members = useSelector(selectReservations);
  const isRequesting = useSelector(state => selectRequesting(state, [ReservationAction.REQUEST_RESERVATION]));

  useEffect(() => {
    dispatch(ReservationAction.getReservations());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(members) ? (
    <ReservationTable members={members} />
  ) : (
    <Starter
      action={() => history.push('reservations/create')}
      actionName="Registra una reservación"
      title="Administración de reservas"
      description="No hay reservas registradas aún!"
    />
  );
};

export default ReservationManagment;
