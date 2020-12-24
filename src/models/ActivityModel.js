import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import LocalModel from './LocalModel';
import AddressModel from './AddressModel';

export default class ActivityModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  activityDate = '';
  activityType = '';
  personCost = 0;
  address = AddressModel;
  locals = [LocalModel];
  multimedia = [MultimediaModel];

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
