import { ReservationStateEnum } from '../constants';

export const getReservationState = reservationState => {
  let reservationName = '';
  switch (reservationState) {
    case ReservationStateEnum.Active:
      reservationName = 'Activo';
      break;
    case ReservationStateEnum.Cancelled:
      reservationName = 'Cancelado';
      break;
    default:
      reservationName = 'Sin definir';
  }
  return reservationName;
};
