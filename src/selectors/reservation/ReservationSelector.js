import { createSelector } from 'reselect';

class ReservationSelector {
  static selectReservations(reservations) {
    return ReservationSelector._createTableRows(reservations);
  }

  static _createTableRows(models) {
    return models.map(({ person, ...model }) => ({
      id: model.id,
      dateReservation: model.dateReservation,
      amountPerson: model.amountPerson,
      reservationState: model.reservationState,
      fullName: `${person.name} ${person.firstLastName} ${person.secondLastName}`
    }));
  }
}

export default ReservationSelector;

export const selectReservations = createSelector(
  state => state.reservations,
  ReservationSelector.selectReservations
);
