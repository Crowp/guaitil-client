import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { ReservationContext } from '../context';
import ReservationModel from '../../models/ReservationModel';
import PersonModel from '../../models/PersonModel';
import PersonEnum from '../../constants/PersonEnum';
import { ReservationStateEnum } from '../../constants';
import ReservationAction from '../../stores/reservation/ReservationAction';
import useActivitiesState from '../hooks/useActivitiesState';

const { Provider } = ReservationContext;
const ReservationProvider = ({ children, defaultItem }) => {
  const [reservation, setReservation] = useState(
    defaultItem || {
      ...new ReservationModel(),
      dateReservation: new moment(),
      activityDescription: { id: 0 },
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

  const handleActivityDescriptionChange = ({ value, name }) => {
    const [activityDescriptionSelected] = activities.filter(x => x.activityDescription.id === value);
    handleInputChangeReservation({
      name: name,
      value: activityDescriptionSelected || { id: 0 }
    });
  };

  const handleReservationCreate = () => {
    const reservationToStore = {
      ...reservation,
      dateReservation: moment(reservation.dateReservation).format('YYYY-MM-DD HH:mm')
    };
    dispatch(ReservationAction.createReservation(reservationToStore));
  };

  const handleReservationUpdate = () => {
    dispatch(ReservationAction.updateReservation(reservation));
  };

  const value = {
    reservation,
    setReservation,
    handleInputChangeReservation,
    handleActivityChange: handleActivityDescriptionChange,
    handleReservationCreate,
    handleReservationUpdate
  };

  return <Provider value={value}>{children}</Provider>;
};

export default ReservationProvider;

ReservationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultItem: PropTypes.any
};
