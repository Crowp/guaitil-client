import { BaseModel } from 'sjs-base-model';

export default class ReservationModel extends BaseModel {
  id = 0;
  dateReservation = '';
  tourId = '';
  personId = 0;
  ReservationStateId = 0;
  numberPerson = 0;

  constructor(data) {
    super();
    this.update(data);
  }
}
