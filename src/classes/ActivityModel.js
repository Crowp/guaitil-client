import { BaseModel } from 'sjs-base-model';
import MultimediaModel from './MultimediaModel';
import LocalModel from './LocalModel';

export default class ActivityModel extends BaseModel {
  id = 0;
  name = '';
  description = '';
  date = '';
  directionId = 0;
  multimedia = MultimediaModel;
  local = LocalModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
