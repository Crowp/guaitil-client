import { BaseModel } from 'sjs-base-model';
import ActivityDescription from './ActivityDescription';
import PersonModel from './PersonModel';

export default class ReservationModel extends BaseModel {
  id = 0;
  dateReservation = '';
  amountPerson = 1;
  reservationState = '';
  createdAt = '';
  updatedAt = '';
  activityDescription = ActivityDescription;
  person = PersonModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
