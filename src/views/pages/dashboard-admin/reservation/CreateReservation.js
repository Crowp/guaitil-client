import React from 'react';
import { useReservations } from '../../../hooks';
import FormReservationContainer from './components/FormReservationContainer';

const CreateReservation = () => {
  const { isRequesting: isRequestingReservations } = useReservations();
  return <FormReservationContainer isloading={isRequestingReservations} />;
};

export default CreateReservation;
