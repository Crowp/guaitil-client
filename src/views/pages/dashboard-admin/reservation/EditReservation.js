import React from 'react';
import { useParams } from 'react-router';
import { RouteMap } from '../../../../constants';
import { useErrorRedirect, useReservationByIdEffect, useReservationsEffect } from '../../../hooks';
import FormReservationContainer from './components/FormReservationContainer';

const EditReservation = () => {
  const { id } = useParams();
  const { isRequesting: isRequestingReservations } = useReservationsEffect();
  const { isRequesting: isReservationRequesting, reservation, hasErrors } = useReservationByIdEffect(id);

  const validatetionError = hasErrors && !isReservationRequesting;
  useErrorRedirect(RouteMap.Reservation.root(), validatetionError);
  const isEmptyObject = !Object.keys(reservation).length;
  return (
    <FormReservationContainer
      defaultItem={reservation}
      isLoading={isReservationRequesting || isRequestingReservations || isEmptyObject}
    />
  );
};

export default React.memo(EditReservation);
