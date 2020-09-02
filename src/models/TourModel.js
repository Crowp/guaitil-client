import { BaseModel } from 'sjs-base-model';
import ActivityModel from './ActivityModel';

export default class TourModel extends BaseModel {
  id = 0;
  amountPerson = 0;
  activity = ActivityModel;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
