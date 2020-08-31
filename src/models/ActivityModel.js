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
  address = AddressModel;
  locals = [LocalModel];
  multimedia = [MultimediaModel];

  constructor(data) {
    super();
    this.update(data);
  }
}
