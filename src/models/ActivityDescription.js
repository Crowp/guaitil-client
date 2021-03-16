import { BaseModel } from 'sjs-base-model';
import AddressModel from './AddressModel';

export default class ActivityModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  activityDate = '';
  address = AddressModel;
  activityType = '';
  personPrice = 0;
  createdAt = '';
  updatedAt = '';

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
