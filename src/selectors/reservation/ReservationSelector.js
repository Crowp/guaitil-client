import { createSelector } from 'reselect';
import moment from 'moment';
import { getReservationState } from '../../utils/ReservationState';
import { sortReservationByUpdateAtDate } from '../../utils/sortByUpdateAtDate';

class ReservationSelector {
  static selectReservations(reservations) {
    return ReservationSelector._createTableRows(reservations);
  }

  static _createTableRows(models) {
    console.log(models);
    const reservationsSorted = sortReservationByUpdateAtDate(models);
    return reservationsSorted.map(({ person, ...model }) => ({
      id: model.id,
      dateReservation: new moment(model.dateReservation).format('DD/MM/YYYY'),
      amountPerson: model.amountPerson,
      reservationState: getReservationState(model.reservationState),
      fullName: `${person.name} ${person.firstLastName} ${person.secondLastName}`,
      activityName: `${model.activityDescription.name}`
    }));
  }
}

export default ReservationSelector;

export const selectReservations = createSelector(
  state => state.reservations,
  ReservationSelector.selectReservations
);
