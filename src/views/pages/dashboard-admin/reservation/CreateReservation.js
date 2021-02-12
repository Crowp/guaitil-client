import React from 'react';
import { useReservationsEffect } from '../../../hooks';
import FormReservationContainer from './components/FormReservationContainer';

const CreateReservation = () => {
  const { isRequesting } = useReservationsEffect();
  return <FormReservationContainer isloading={isRequesting} />;
};

export default CreateReservation;
