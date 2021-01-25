import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import ReservationAction from '../../stores/reservation/ReservationAction';

const useReservation = (selector = state => state.reservations) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([ReservationAction.REQUEST_RESERVATION]);
  const items = useSelector(state => selector(state));
  const hasErrors = useHasErrors([ReservationAction.REQUEST_RESERVATION_FINISHED]);
  useEffect(() => {
    dispatch(ReservationAction.getReservations());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useReservation;
