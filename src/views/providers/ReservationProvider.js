import React, { useState, useEffect } from 'react';
import { ReservationContext } from '../context';
import ReservationModel from '../../models/ReservationModel';
import PersonModel from '../../models/PersonModel';
import TourModel from '../../models/TourModel';
import moment from 'moment';

const { Provider } = ReservationContext;
const ReservationProvider = ({ children, defultReservation }) => {
  const [reservation, setReservation] = useState(
    defultReservation || {
      ...new ReservationModel(),
      tour: new TourModel(),
      dateReservation: new moment(),
      person: new PersonModel()
    }
  );

  useEffect(() => {
    if (defultReservation) {
      setReservation(defultReservation);
    }
  }, [defultReservation]);

  const handleInputChangeReservation = ({ value, name }) => setReservation({ ...reservation, [name]: value });
  const value = { reservation, setReservation, handleInputChangeReservation };

  return <Provider value={value}>{children}</Provider>;
};

export default ReservationProvider;
