import { BaseModel } from 'sjs-base-model';
import LocalModel from './LocalModel';

export default class LodgingModel extends BaseModel {
  local = LocalModel;
  id = 0;
  capacity = 0;

  constructor(data) {
    super();
    this.update(data);
  }
}
