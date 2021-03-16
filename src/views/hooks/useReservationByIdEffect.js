import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import ReservationAction from '../../stores/reservation/ReservationAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useReservationsState from './useReservationsState';

const useReservationByIdEffect = id => {
  const dispatch = useDispatch();
  const [reservation, setReservation] = useState({});
  const [load, setLoad] = useState(false);
  const reservations = useReservationsState();

  const isRequesting = useIsRequesting([ReservationAction.REQUEST_RESERVATION_BY_ID]);
  const hasErrors = useHasErrors([ReservationAction.REQUEST_RESERVATION_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(reservations) && id) {
      const [reservationFounded = {}] = reservations.filter(item => item.id === Number(id));
      if (reservationFounded) {
        setReservation(reservationFounded);
      }
    } else if (!load && id) {
      dispatch(ReservationAction.getReservationById(id));
      setLoad(true);
    }
  }, [dispatch, id, reservations, load]);

  return { isRequesting, reservation, hasErrors, reservations };
};

export default useReservationByIdEffect;
