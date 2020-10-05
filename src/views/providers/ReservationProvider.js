import React, { useState, useEffect } from 'react';
import { ReservationContext } from '../context';
import ReservationModel from '../../models/ReservationModel';
import PersonModel from '../../models/PersonModel';
import PersonEnum from '../../constants/PersonEnum';
import ActivityModel from '../../models/ActivityModel';
import { ReservationStateEnum } from '../../constants';
import moment from 'moment';

const { Provider } = ReservationContext;
const ReservationProvider = ({ children, defultReservation }) => {
  const [reservation, setReservation] = useState(
    defultReservation || {
      ...new ReservationModel(),
      activity: new ActivityModel(),
      dateReservation: new moment(),
      reservationState: ReservationStateEnum.Active,
      person: {
        ...new PersonModel(),
        personType: PersonEnum.Client
      }
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
