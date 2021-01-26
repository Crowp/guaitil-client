import { useSelector } from 'react-redux';

const useReservationsState = (selector = state => state.reservations) => useSelector(state => selector(state));

export default useReservationsState;
