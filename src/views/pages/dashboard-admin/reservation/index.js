import React from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import ReservationTable from './ReservationTable';
import { selectReservations } from '../../../../selectors/reservation/ReservationSelector';
import useReservation from '../../../hooks/useReservation';
import { Col, Row } from 'reactstrap';

const ReservationManagment = () => {
  const history = useHistory();

  const { isRequesting, items: reservations } = useReservation(selectReservations);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(reservations) ? (
    <ReservationTable reservations={reservations} />
  ) : (
    <Starter
      action={() => history.push('/admin/reservations/create')}
      actionName="Registra una reservación"
      title="Administración de reservas"
      description="No hay reservas aún!"
    />
  );
};

export default React.memo(ReservationManagment);