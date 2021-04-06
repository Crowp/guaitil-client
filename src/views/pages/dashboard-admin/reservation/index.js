import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '@/template/helpers/utils';
import ReservationTable from './ReservationTable';
import { selectReservations } from '../../../../selectors/reservation/ReservationSelector';
import { RouteMap } from '../../../../constants';
import Loader from '@/template/components/common/Loader';
import { useReservationsEffect } from '../../../hooks';

const ReservationManagment = () => {
  const history = useHistory();

  const { isRequesting, items: reservations } = useReservationsEffect(selectReservations);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(reservations) ? (
    <ReservationTable reservations={reservations} />
  ) : (
    <Starter
      action={() => history.push(RouteMap.Reservation.create())}
      actionName="Registrar una reservación"
      title="Administración de reservas"
      description="Aún no hay reservaciones registradas!"
    />
  );
};

export default React.memo(ReservationManagment);
