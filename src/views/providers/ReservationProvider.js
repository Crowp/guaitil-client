import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ReservationContext } from '../context';
import ReservationModel from '../../models/ReservationModel';
import PersonModel from '../../models/PersonModel';
import PersonEnum from '../../constants/PersonEnum';
import { ReservationStateEnum } from '../../constants';
import { useDispatch } from 'react-redux';
import ReservationAction from '../../stores/reservation/ReservationAction';
import useActivitiesState from '../hooks/useActivitiesState';

const { Provider } = ReservationContext;
const ReservationProvider = ({ children, defaultItem }) => {
  const [reservation, setReservation] = useState(
    defaultItem || {
      ...new ReservationModel(),
      activity: { id: 0 },
      dateReservation: new moment(),
      reservationState: ReservationStateEnum.Active,
      person: {
        ...new PersonModel(),
        personType: PersonEnum.Client
      }
    }
  );
  const activities = useActivitiesState(state => state.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultItem) {
      setReservation(defaultItem);
    }
  }, [defaultItem]);

  const handleInputChangeReservation = ({ value, name }) => setReservation({ ...reservation, [name]: value });

  const handleActivityChange = ({ value, name }) => {
    const [activitySelected] = activities.filter(x => x.id === value);
    handleInputChangeReservation({
      name: name,
      value: activitySelected || { id: 0 }
    });
  };

  const handleReservationCreate = () => {
    dispatch(ReservationAction.createReservation(reservation));
  };

  const handleReservationUpdate = () => {
    dispatch(ReservationAction.updateReservation(reservation));
  };

  const value = {
    reservation,
    setReservation,
    handleInputChangeReservation,
    handleActivityChange,
    handleReservationCreate,
    handleReservationUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ReservationProvider;
