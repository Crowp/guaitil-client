import React from 'react';
import { useReservationsEffect } from '../../../hooks';
import FormReservationContainer from './components/FormReservationContainer';

const CreateReservation = () => {
  const { isRequesting: isRequestingReservations } = useReservationsEffect();
  return <FormReservationContainer isloading={isRequestingReservations} />;
};

export default CreateReservation;
