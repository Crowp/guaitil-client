import { BaseModel } from 'sjs-base-model';
import ActivityModel from './ActivityModel';
import PersonModel from './PersonModel';

export default class ReservationModel extends BaseModel {
  id = 0;
  dateReservation = '';
  amountPerson = 0;
  reservationState = '';
  activity = ActivityModel;
  person = PersonModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
