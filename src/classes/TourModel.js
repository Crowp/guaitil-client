import { BaseModel } from 'sjs-base-model';

export default class TourModel extends BaseModel {
  id = 0;
  numberPerson = 0;
  activityId = 0;
  pricePerPerson = 0;

  constructor(data) {
    super();
    this.update(data);
  }
}
