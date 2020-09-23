import { createSelector } from 'reselect';
import moment from 'moment';
import { getReservationState } from '../../utils/ReservationState';

class ReservationSelector {
  static selectReservations(reservations) {
    return ReservationSelector._createTableRows(reservations);
  }

  static _createTableRows(models) {
    return models.map(({ person, ...model }) => ({
      id: model.id,
      dateReservation: new moment(model.dateReservation).format('DD/MM/YYYY'),
      amountPerson: model.amountPerson,
      reservationState: getReservationState(model.reservationState),
      fullName: `${person.name} ${person.firstLastName} ${person.secondLastName}`
    }));
  }
}

export default ReservationSelector;

export const selectReservations = createSelector(
  state => state.reservations,
  ReservationSelector.selectReservations
);
