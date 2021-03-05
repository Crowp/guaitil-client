import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import LocalDescription from './LocalDescription';
import ActivityDescription from './ActivityDescription';

export default class ActivityModel extends BaseModel {
  id = 0;
  activityDescription = ActivityDescription;
  localsDescriptions = [LocalDescription];
  multimedia = [MultimediaModel];
  isActive = true;

  constructor(data = {}) {
    super();
    if (!Object.keys(data).length) {
      this.id = null;
    }
    this.update(data);
  }
}
